import React, { useState } from 'react';
import { Box, Heading, Button, FormControl, FormLabel, Input, VStack, useToast, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDevicePage = () => {
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [cluster, setCluster] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/devices', { name, ip_address: ipAddress, cluster });
      toast({ title: 'Perangkat berhasil ditambah', status: 'success', duration: 3000, isClosable: true });
      navigate('/dashboard/devices'); // Kembali ke halaman daftar setelah berhasil
    } catch (error) {
      toast({ title: 'Gagal menambah perangkat', description: error.response?.data?.msg, status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Box>
      <Heading mb={6}>Tambah Perangkat Baru</Heading>
      <VStack 
        as="form" 
        onSubmit={handleSubmit} 
        spacing={4} 
        p={8} 
        borderWidth={1} 
        borderRadius="md" 
        boxShadow="lg" 
        alignItems="stretch"
      >
        <FormControl isRequired>
          <FormLabel>Nama Perangkat</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>IP Address</FormLabel>
          <Input value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Nama Cluster</FormLabel>
          <Input value={cluster} onChange={(e) => setCluster(e.target.value)} placeholder="Contoh: Pinus, Pulogebang" />
        </FormControl>
        <Flex justifyContent="flex-end" mt={4}>
          <Button variant="outline" mr={3} onClick={() => navigate('/dashboard/devices')}>Batal</Button>
          <Button type="submit" colorScheme="teal">Simpan</Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default AddDevicePage;