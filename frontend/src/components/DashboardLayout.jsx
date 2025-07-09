import React from 'react';
import { Box, Flex, Text, Link as ChakraLink, VStack, Heading } from '@chakra-ui/react';
import { NavLink as RouterLink, Outlet } from 'react-router-dom';
// Import ikon yang akan kita gunakan
import { FaTachometerAlt, FaHdd, FaDesktop, FaCog } from 'react-icons/fa';

// Struktur data baru untuk menu
const menuGroups = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt },
      { name: 'Monitoring', path: '/dashboard/monitoring', icon: FaDesktop },
    ]
  },
  {
    title: 'MANAGEMENT',
    items: [
      { name: 'Perangkat OLT', path: '/dashboard/devices', icon: FaHdd },
      { name: 'Settings', path: '/dashboard/settings', icon: FaCog },
    ]
  }
];

// Komponen untuk setiap link menu
const NavItem = ({ icon, children, to }) => {
  return (
    <ChakraLink
      as={RouterLink}
      to={to}
      p={3}
      borderRadius="md"
      w="full"
      _hover={{ bg: 'gray.700' }}
      // Style untuk link yang sedang aktif
      _activeLink={{
        bg: 'teal.500',
        color: 'white',
      }}
    >
      <Flex align="center">
        <Box as={icon} mr={3} />
        <Text>{children}</Text>
      </Flex>
    </ChakraLink>
  );
};

// Komponen Sidebar yang sudah direvisi
const Sidebar = () => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    w="60" // 240px
    bg="gray.800"
    color="white"
    p={5}
  >
    <Heading as="h1" size="lg" mb={10} color="white">
      FTTH Monitor
    </Heading>
    <VStack spacing={6} align="stretch">
      {menuGroups.map((group) => (
        <Box key={group.title}>
          <Text fontSize="xs" color="gray.400" fontWeight="bold" textTransform="uppercase" mb={2}>
            {group.title}
          </Text>
          <VStack spacing={2} align="stretch">
            {group.items.map((item) => (
              <NavItem key={item.name} icon={item.icon} to={item.path}>
                {item.name}
              </NavItem>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  </Box>
);

const DashboardLayout = () => {
  return (
    <Flex>
      <Sidebar />
      <Box as="main" p={8} ml="60" w="full" minH="100vh">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;