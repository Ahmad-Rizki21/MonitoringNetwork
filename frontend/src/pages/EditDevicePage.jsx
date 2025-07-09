import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, FormControl, FormLabel, Input, VStack, useToast, Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDevicePage = () => {
  // State untuk setiap field form
  const [deviceData, setDeviceData] = useState({
    name: '',
    ip_address: '',
    cluster: '',
    snmp_community: 'public' // <-- Nilai default
  });
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/devices/${id}`);
        setDeviceData(data); // Simpan seluruh data device
        setIsLoading(false);
      } catch (error) {
        toast({ title: 'Gagal memuat data perangkat', status: 'error' });
        navigate('/dashboard/devices');
      }
    };
    fetchDevice();
  }, [id, navigate, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim seluruh state deviceData
      await axios.put(`http://localhost:5000/devices/${id}`, deviceData);
      toast({ title: 'Perangkat berhasil diperbarui', status: 'success' });
      navigate('/dashboard/devices');
    } catch (error) {
      toast({ title: 'Gagal memperbarui perangkat', description: error.response?.data?.msg, status: 'error' });
    }
  };

  // Handler input yang lebih dinamis
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceData({ ...deviceData, [name]: value });
  };

  if (isLoading) return <Spinner size="xl" />;

  return (
    <Box>
      <Heading mb={6}>Edit Perangkat</Heading>
      <VStack as="form" onSubmit={handleSubmit} spacing={4} p={8} borderWidth={1} borderRadius="md" boxShadow="lg" alignItems="stretch">
        <FormControl isRequired>
          <FormLabel>Nama Perangkat</FormLabel>
          <Input name="name" value={deviceData.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>IP Address</FormLabel>
          <Input name="ip_address" value={deviceData.ip_address} onChange={handleInputChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Nama Cluster</FormLabel>
          <Input name="cluster" value={deviceData.cluster} onChange={handleInputChange} />
        </FormControl>
        {/* --- INPUT BARU UNTUK SNMP COMMUNITY --- */}
        <FormControl isRequired>
          <FormLabel>SNMP Community (Read-Only)</FormLabel>
          <Input name="snmp_community" value={deviceData.snmp_community} onChange={handleInputChange} />
        </FormControl>
        <Flex justifyContent="flex-end" mt={4}>
          <Button variant="outline" mr={3} onClick={() => navigate('/dashboard/devices')}>Batal</Button>
          <Button type="submit" colorScheme="blue">Simpan Perubahan</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default EditDevicePage;