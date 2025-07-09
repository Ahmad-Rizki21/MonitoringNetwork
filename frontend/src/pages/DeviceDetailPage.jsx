import React, { useState, useEffect } from 'react';
import {
  Box, Heading, Button, SimpleGrid, Text, useToast, Spinner, Flex, Spacer,
  CircularProgress, CircularProgressLabel, VStack, HStack, Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Komponen kartu untuk menampilkan data secara konsisten
const DetailCard = ({ title, value, ...props }) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white" {...props}>
    <Text fontSize="sm" color="gray.500" textTransform="uppercase">
      {title}
    </Text>
    <Heading size="md" mt={1} noOfLines={1} title={value || 'N/A'}>
      {value || 'N/A'}
    </Heading>
  </Box>
);

const DeviceDetailPage = () => {
  const [device, setDevice] = useState(null);
  const [allDevicesInCluster, setAllDevicesInCluster] = useState([]);
  const [targetDeviceId, setTargetDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // Fungsi untuk mengambil data detail perangkat
  const fetchDevice = async () => {
    try {
      const { data: currentDevice } = await axios.get(`http://localhost:5000/devices/${id}`);
      setDevice(currentDevice);

      // Ambil juga daftar perangkat lain di cluster yang sama untuk form koneksi
      if (currentDevice.cluster) {
        const { data: allDevices } = await axios.get(`http://localhost:5000/devices?cluster=${currentDevice.cluster}`);
        setAllDevicesInCluster(allDevices.filter(d => d.id !== currentDevice.id));
      }
    } catch (error) {
      toast({ title: 'Gagal memuat data perangkat', status: 'error', duration: 3000, isClosable: true });
      navigate('/dashboard/devices');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevice();
  }, [id]);

  // Fungsi untuk refresh data SNMP
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await axios.post(`http://localhost:5000/devices/${id}/refresh`);
      toast({ title: 'Data SNMP berhasil diperbarui!', status: 'success', duration: 3000, isClosable: true });
      fetchDevice(); // Ambil data lagi setelah refresh
    } catch (error) {
      toast({ title: 'Gagal me-refresh data SNMP', description: 'Pastikan SNMP aktif di perangkat & OID benar.', status: 'error', duration: 5000, isClosable: true });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Fungsi untuk membuat koneksi baru
  const handleCreateConnection = async () => {
    if (!targetDeviceId) {
      toast({ title: "Pilih perangkat tujuan terlebih dahulu", status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    try {
      await axios.post('http://localhost:5000/connections', { sourceId: device.id, targetId: targetDeviceId });
      toast({ title: "Koneksi berhasil dibuat!", description: `Perangkat ${device.name} terhubung ke perangkat lain.`, status: 'success', duration: 4000, isClosable: true });
    } catch (error) {
      toast({ title: "Gagal membuat koneksi", description: error.response?.data?.msg || 'Mungkin koneksi sudah ada.', status: 'error', duration: 4000, isClosable: true });
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="50vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box>
      <Flex alignItems="center" mb={6}>
        <Heading>{device?.name || 'Detail Perangkat'}</Heading>
        <Spacer />
        <Button onClick={handleRefresh} isLoading={isRefreshing} colorScheme="teal">
          Refresh Data SNMP
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
        {/* Kolom Informasi Utama */}
        <VStack spacing={6} align="stretch">
          <DetailCard title="IP Address" value={device.ip_address} />
          <DetailCard title="Cluster" value={device.cluster} />
          <DetailCard title="Product Model" value={device.product_model} />
          <DetailCard title="Firmware Version" value={device.firmware_version} />
          <DetailCard title="Uptime" value={device.uptime} />
        </VStack>

        {/* Kolom Status & Hardware */}
        <VStack spacing={6} align="stretch">
           <DetailCard title="Status" value={device.status} />
           <DetailCard title="Latency" value={device.latency} />
           <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
             <Text fontSize="sm" color="gray.500">HARDWARE STATUS</Text>
             <HStack spacing={8} align="center" justify="center" mt={6} >
               <Box textAlign="center">
                 <CircularProgress value={device.cpu_usage || 0} color="blue.400" size="120px" thickness="8px">
                   <CircularProgressLabel>{device.cpu_usage || 0}%</CircularProgressLabel>
                 </CircularProgress>
                 <Text mt={2} fontWeight="bold">CPU Usage</Text>
               </Box>
               <Box textAlign="center">
                 <CircularProgress value={device.memory_usage || 0} color="green.400" size="120px" thickness="8px">
                   <CircularProgressLabel>{device.memory_usage || 0}%</CircularProgressLabel>
                 </CircularProgress>
                 <Text mt={2} fontWeight="bold">Memory Usage</Text>
               </Box>
             </HStack>
           </Box>
        </VStack>
        
        {/* Kolom Koneksi */}
        <VStack spacing={6} align="stretch">
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
            <Heading size="md" mb={4}>Hubungkan ke Perangkat Lain</Heading>
            <Text fontSize="sm" color="gray.600" mb={4}>Pilih perangkat dari cluster yang sama untuk membuat garis koneksi di halaman monitoring.</Text>
            <HStack>
              <Select placeholder="Pilih perangkat tujuan" onChange={(e) => setTargetDeviceId(e.target.value)}>
                {allDevicesInCluster.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </Select>
              <Button colorScheme="blue" onClick={handleCreateConnection} minW="120px">Hubungkan</Button>
            </HStack>
          </Box>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default DeviceDetailPage;