import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Kirim data ke API backend
      await axios.post('http://localhost:5000/register', {
        username: username,
        password: password
      });

      // Tampilkan notifikasi sukses
      toast({
        title: 'Registrasi Berhasil.',
        description: "Silakan login dengan akun Anda.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Arahkan ke halaman login setelah berhasil
      navigate('/');

    } catch (error) {
      // Tampilkan notifikasi error
      toast({
        title: 'Registrasi Gagal.',
        description: error.response?.data?.msg || "Terjadi kesalahan pada server.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="calc(100vh - 80px)">
      <VStack as="form" onSubmit={handleRegister} spacing={4} p={8} borderWidth={1} borderRadius="md" boxShadow="lg">
        <Heading>Register</Heading>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">
          Register
        </Button>
      </VStack>
    </Box>
  );
};

export default RegisterPage;