import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast, chakra, Flex } from '@chakra-ui/react';
import { FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
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
      await axios.post('http://localhost:5000/register', {
        username,
        password,
      });

      toast({
        title: 'Registrasi Berhasil.',
        description: 'Silakan login dengan akun Anda.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Registrasi Gagal.',
        description: error.response?.data?.msg || 'Terjadi kesalahan pada server.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <Flex
      minHeight="100vh"
      bgGradient="linear(to-br, blue.500, purple.700)"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack
        as="form"
        onSubmit={handleRegister}
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
        <Heading color="purple.500" fontSize="3xl" fontWeight="bold">Create Account</Heading>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            size="lg" // Ukuran input lebih besar
            leftIcon={<FaUser />}
            focusBorderColor="purple.400"
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
            focusBorderColor="purple.400"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          size="lg"
          fontSize="md"
          _hover={{ bg: 'blue.600' }}
          _active={{ bg: 'blue.700' }}
        >
          Register
        </Button>
        <chakra.a
          color="teal.500"
          onClick={() => navigate('/')}
          cursor="pointer"
          _hover={{ textDecoration: 'underline' }}
          fontSize="sm"
        >
          Already have an account? Login
        </chakra.a>
      </VStack>
    </Flex>
  );
};

export default RegisterPage;