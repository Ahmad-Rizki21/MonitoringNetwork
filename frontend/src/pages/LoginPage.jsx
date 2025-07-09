import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, chakra, Flex } from '@chakra-ui/react';
import { FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Username dan password harus diisi.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login Gagal.',
        description: error.response?.data?.msg || 'Terjadi kesalahan pada server.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <Flex
      minHeight="100vh"
      bgGradient="linear(to-br, teal.500, blue.700)"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack
        as="form"
        onSubmit={handleLogin}
        spacing={8}
        p={10}
        bg="white"
        borderRadius="3xl"
        boxShadow="2xl"
        maxW="500px" // Meningkatkan lebar maksimum
        w="90%"    // Mengisi 90% lebar layar untuk responsivitas
        transition="all 0.3s ease"
        _hover={{ transform: 'translateY(-5px)', boxShadow: '3xl' }}
      >
        <Heading color="teal.500" fontSize="3xl" fontWeight="bold">Welcome Back</Heading>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            size="lg" // Ukuran input lebih besar
            leftIcon={<FaUser />}
            focusBorderColor="teal.400"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            size="lg" // Ukuran input lebih besar
            leftIcon={<FaLock />}
            focusBorderColor="teal.400"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          size="lg"
          fontSize="md"
          _hover={{ bg: 'teal.600' }}
          _active={{ bg: 'teal.700' }}
        >
          Login
        </Button>
        {/* <chakra.a
          color="blue.500"
          onClick={() => navigate('/register')}
          cursor="pointer"
          _hover={{ textDecoration: 'underline' }}
          fontSize="sm"
        >
          Don't have an account? Register
        </chakra.a> */}
      </VStack>
    </Flex>
  );
};

export default LoginPage;