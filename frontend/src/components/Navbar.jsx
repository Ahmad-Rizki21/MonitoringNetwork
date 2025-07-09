import React from 'react';
import { Box, HStack, Button, Link as ChakraLink, useColorModeValue } from '@chakra-ui/react'; // <-- Import useColorModeValue
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
    window.location.reload(); 
  };

  // Tentukan warna latar belakang berdasarkan tema
  // 'gray.100' untuk light mode, 'gray.900' untuk dark mode
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  return (
    // Gunakan variabel bgColor yang sudah adaptif
    <Box bg={bgColor} p={4} boxShadow="sm">
      <HStack spacing={8} justifyContent="space-between">
        <HStack spacing={8}>
          {/* Bagian ini sengaja dikosongkan untuk memberi ruang */}
        </HStack>
        
        <HStack spacing={4}>
          {!token ? (
            <>
              <ChakraLink as={Link} to="/">Login</ChakraLink>
              <ChakraLink as={Link} to="/register">Register</ChakraLink>
            </>
          ) : (
            <Button colorScheme="red" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

export default Navbar;