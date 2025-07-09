import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Tag, Skeleton, VStack, Text } from '@chakra-ui/react';
import StatCard from '../components/StatCard';
import { Line } from 'react-chartjs-2';
import { useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
import Footer from '../components/Footer';

// Registrasi komponen chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Data dummy untuk grafik, kita simpan untuk sementara
const lineChartData = {
  labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli'],
  datasets: [
    {
      label: 'Perangkat Online',
      data: [65, 59, 80, 81, 56, 55, 90],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const OverviewPage = () => {
  const [stats, setStats] = useState({ total: 0, online: 0, offline: 0, alarms: 0 });
  const [recentDevices, setRecentDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardBg = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    const fetchOverviewData = async () => {
      setIsLoading(true);
      try {
        const { data: devices } = await axios.get('http://localhost:5000/devices');
        
        const total = devices.length;
        const online = devices.filter(d => d.status === 'online').length;
        const offline = devices.filter(d => d.status === 'offline').length;
        
        setStats({ total, online, offline, alarms: offline });

        const sortedDevices = [...devices].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentDevices(sortedDevices.slice(0, 5));

      } catch (error) {
        console.error("Gagal mengambil data overview:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box flex="1">
        <Heading mb={6}>Overview Dashboard</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          <Skeleton isLoaded={!isLoading} rounded="lg"><StatCard title="Total Perangkat" stat={stats.total} helpText="Di semua lokasi" /></Skeleton>
          <Skeleton isLoaded={!isLoading} rounded="lg"><StatCard title="Perangkat Online" stat={stats.online} helpText={`${stats.total > 0 ? ((stats.online / stats.total) * 100).toFixed(1) : 0}% Uptime`} /></Skeleton>
          <Skeleton isLoaded={!isLoading} rounded="lg"><StatCard title="Perangkat Offline" stat={stats.offline} helpText="Perlu pengecekan" /></Skeleton>
          <Skeleton isLoaded={!isLoading} rounded="lg"><StatCard title="Alarms" stat={stats.alarms} helpText="Gangguan terdeteksi" /></Skeleton>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={cardBg} h={{ base: "300px", md: "400px" }}>
            <Heading size="md" mb={4}>Tren Uptime (Contoh)</Heading>
            <Line data={lineChartData} />
          </Box>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={cardBg}>
            <Heading size="md" mb={4}>Status Perangkat Terbaru</Heading>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Perangkat</Th>
                    <Th>Status</Th>
                    <Th>Cluster</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {isLoading ? (
                    <>
                      <Tr><Td colSpan={3}><Skeleton height="20px" /></Td></Tr>
                      <Tr><Td colSpan={3}><Skeleton height="20px" /></Td></Tr>
                      <Tr><Td colSpan={3}><Skeleton height="20px" /></Td></Tr>
                    </>
                  ) : recentDevices.length > 0 ? (
                    recentDevices.map((device) => (
                      <Tr key={device.id}>
                        <Td>{device.name}</Td>
                        <Td>
                          <Tag colorScheme={device.status === 'online' ? 'green' : 'red'}>
                            {device.status}
                          </Tag>
                        </Td>
                        <Td>{device.cluster}</Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={3}>
                        <Text textAlign="center" color="gray.500">Tidak ada perangkat.</Text>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
};

export default OverviewPage;