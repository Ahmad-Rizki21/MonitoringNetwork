import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const DashboardPage = () => {
  return (
    <Box p={8}>
      <Heading>Selamat Datang di Dashboard</Heading>
      <p>Ini adalah halaman yang dilindungi. Anda hanya bisa melihat ini jika sudah login.</p>
    </Box>
  );
};

export default DashboardPage;