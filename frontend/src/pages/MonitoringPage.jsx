import React, { useEffect, useState, useCallback } from 'react';
import { Box, Heading, Select, FormControl, FormLabel } from '@chakra-ui/react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, MarkerType } from 'reactflow';
import axios from 'axios';
import { io } from 'socket.io-client';
import 'reactflow/dist/style.css';
import Footer from '../components/Footer';

const socket = io('http://localhost:5000');

const getNodeColor = (status) => {
  if (status === 'online') return '#a7f3d0';
  if (status === 'offline') return '#fecaca';
  return '#e5e7eb';
};

const MonitoringPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [clusters, setClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(() => {
    // Ambil cluster terakhir dari localStorage saat komponen dimuat
    return localStorage.getItem('selectedCluster') || '';
  });

  const fetchTopologyForCluster = useCallback(async (clusterName) => {
    if (!clusterName) {
      setNodes([]);
      setEdges([]);
      return;
    }
    try {
      const [devicesRes, connectionsRes] = await Promise.all([
        axios.get(`http://localhost:5000/devices?cluster=${clusterName}`),
        axios.get(`http://localhost:5000/connections?cluster=${clusterName}`),
      ]);

      const devices = devicesRes.data;
      const connections = connectionsRes.data;

      const flowNodes = devices.map((device, index) => ({
        id: `device-${device.id}`,
        position: { x: 250, y: 150 * index },
        data: { name: device.name, label: `${device.name}\n${device.status} (${device.latency})` },
        style: { backgroundColor: getNodeColor(device.status), width: 220, textAlign: 'center', fontSize: '14px', borderRadius: '8px' },
      }));
      
      const flowEdges = connections.map(conn => ({
        id: `edge-${conn.sourceId}-to-${conn.targetId}`,
        source: `device-${conn.sourceId}`,
        target: `device-${conn.targetId}`,
        type: 'smoothstep',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
      }));

      setNodes(flowNodes);
      setEdges(flowEdges);
    } catch (error) {
      console.error("Gagal memuat topologi untuk cluster:", clusterName, error);
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    const fetchInitialClusters = async () => {
      try {
        const { data: allDevices } = await axios.get('http://localhost:5000/devices');
        const uniqueClusters = [...new Set(allDevices.map(device => device.cluster))];
        setClusters(uniqueClusters);
        // Jika ada cluster tersimpan di localStorage dan ada di daftar cluster, gunakan itu
        const savedCluster = localStorage.getItem('selectedCluster');
        if (savedCluster && uniqueClusters.includes(savedCluster)) {
          setSelectedCluster(savedCluster);
        } else if (uniqueClusters.length > 0) {
          setSelectedCluster(uniqueClusters[0]);
        }
      } catch (error) {
        console.error("Gagal memuat daftar cluster:", error);
      }
    };
    fetchInitialClusters();
  }, []);

  useEffect(() => {
    // Simpan selectedCluster ke localStorage setiap kali berubah
    if (selectedCluster) {
      localStorage.setItem('selectedCluster', selectedCluster);
    }
    fetchTopologyForCluster(selectedCluster);
  }, [selectedCluster, fetchTopologyForCluster]);

  useEffect(() => {
    const onDeviceUpdate = ({ id, status, latency }) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          if (node.id === `device-${id}`) {
            return {
              ...node,
              data: { ...node.data, label: `${node.data.name}\n${status} (${latency})` },
              style: { ...node.style, backgroundColor: getNodeColor(status) },
            };
          }
          return node;
        })
      );
    };
    socket.on('device-update', onDeviceUpdate);
    return () => socket.off('device-update', onDeviceUpdate);
  }, [setNodes]);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box flex="1">
        <Heading mb={4}>Real-time Monitoring</Heading>
        <FormControl mb={6} maxW="500px">
          <FormLabel>Pilih Cluster</FormLabel>
          <Select
            placeholder="Pilih Cluster"
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            size="lg" // Ukuran select lebih besar untuk konsistensi
          >
            {clusters.map(cluster => (
              <option key={cluster} value={cluster}>{cluster}</option>
            ))}
          </Select>
        </FormControl>
        <Box h="calc(100vh - 200px)" borderWidth="1px" borderRadius="lg" bg="white" overflow="hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background variant="dots" />
          </ReactFlow>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MonitoringPage;