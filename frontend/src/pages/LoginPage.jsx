import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password
      });

      // Simpan token ke localStorage
      localStorage.setItem('accessToken', response.data.accessToken);

      // Arahkan ke halaman dashboard
      navigate('/dashboard');

    } catch (error) {
      toast({
        title: 'Login Gagal.',
        description: error.response?.data?.msg || "Terjadi kesalahan pada server.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="calc(100vh - 80px)">
      <VStack as="form" onSubmit={handleLogin} spacing={4} p={8} borderWidth={1} borderRadius="md" boxShadow="lg">
        <Heading>Login</Heading>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;