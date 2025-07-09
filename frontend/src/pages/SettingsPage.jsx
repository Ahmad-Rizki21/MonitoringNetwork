import React, { useState } from 'react';
import { Box, Heading, Flex, VStack, Button, Text, Divider } from '@chakra-ui/react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { FaUserShield, FaPalette } from 'react-icons/fa';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profil');

  return (
    <Box>
      <Heading mb={6}>Settings</Heading>

      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        {/* Kolom Menu Navigasi Kiri */}
        <VStack
          as="nav"
          w={{ base: 'full', md: '250px' }}
          align="stretch"
          spacing={2}
        >
          <Button 
            leftIcon={<FaUserShield />} 
            justifyContent="flex-start" 
            variant={activeTab === 'profil' ? 'solid' : 'ghost'} 
            colorScheme="teal"
            onClick={() => setActiveTab('profil')}
          >
            Profil & Keamanan
          </Button>
          <Button 
            leftIcon={<FaPalette />} 
            justifyContent="flex-start" 
            variant={activeTab === 'tampilan' ? 'solid' : 'ghost'} 
            colorScheme="teal"
            onClick={() => setActiveTab('tampilan')}
          >
            Tampilan
          </Button>
        </VStack>

        {/* Kolom Konten Kanan */}
        <Box 
          flex="1" 
          p={8} 
          borderWidth="1px" 
          borderRadius="lg" 
          boxShadow="sm"
        >
          {activeTab === 'profil' && (
            <Box>
              <Heading size="lg" mb={2}>Ganti Password</Heading>
              <Text color="gray.500" mb={6}>Untuk keamanan akun Anda, ganti password secara berkala.</Text>
              <Divider mb={6} />
              <ChangePasswordForm />
            </Box>
          )}

          {activeTab === 'tampilan' && (
            <Box>
              <Heading size="lg" mb={2}>Tema Aplikasi</Heading>
              <Text color="gray.500" mb={6}>Pilih antara tema terang atau gelap sesuai preferensi Anda.</Text>
              <Divider mb={6} />
              <ThemeSwitcher />
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default SettingsPage;