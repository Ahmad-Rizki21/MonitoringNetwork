import React, { useState } from 'react';
import { Box, Heading, Flex, VStack, Button, Text, Divider } from '@chakra-ui/react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import ThemeSwitcher from '../components/ThemeSwitcher';
import NotificationSettings from '../components/NotificationSettings';
import AccountPreferences from '../components/AccountPreferences';
import { FaUserShield, FaPalette, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Footer from '../components/Footer';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profil');

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box flex="1">
        <Heading mb={6}>Settings</Heading>

        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
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
            <Button 
              leftIcon={<FaBell />} 
              justifyContent="flex-start" 
              variant={activeTab === 'notifikasi' ? 'solid' : 'ghost'} 
              colorScheme="teal"
              onClick={() => setActiveTab('notifikasi')}
            >
              Notifikasi
            </Button>
            <Button 
              leftIcon={<FaCog />} 
              justifyContent="flex-start" 
              variant={activeTab === 'preferensi' ? 'solid' : 'ghost'} 
              colorScheme="teal"
              onClick={() => setActiveTab('preferensi')}
            >
              Preferensi Akun
            </Button>
          </VStack>

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

            {activeTab === 'notifikasi' && (
              <Box>
                <Heading size="lg" mb={2}>Pengaturan Notifikasi</Heading>
                <Text color="gray.500" mb={6}>Kelola notifikasi untuk aktivitas akun Anda.</Text>
                <Divider mb={6} />
                <NotificationSettings />
              </Box>
            )}

            {activeTab === 'preferensi' && (
              <Box>
                <Heading size="lg" mb={2}>Preferensi Akun</Heading>
                <Text color="gray.500" mb={6}>Atur preferensi akun Anda di sini.</Text>
                <Divider mb={6} />
                <AccountPreferences />
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default SettingsPage;