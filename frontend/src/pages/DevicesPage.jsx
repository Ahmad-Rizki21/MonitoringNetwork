import { Link as RouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import {
  Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, useToast, IconButton, HStack, Flex, Spacer,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure,
  Skeleton,
  Badge,
  VStack,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const tableBg = useColorModeValue('white', 'gray.700');

  const fetchDevices = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/devices');
      setDevices(data);
    } catch (error) {
      toast({ title: 'Gagal memuat data perangkat', status: 'error', duration: 3000, isClosable: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const openDeleteDialog = (id) => {
    setDeviceToDelete(id);
    onOpen();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/devices/${deviceToDelete}`);
      toast({ title: 'Perangkat berhasil dihapus', status: 'warning', duration: 3000, isClosable: true });
      fetchDevices();
      onClose();
    } catch (error) {
      toast({ title: 'Gagal menghapus perangkat', status: 'error', duration: 3000, isClosable: true });
    }
  };
  
  const TableSkeleton = () => (
    <>
      <Tr><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td></Tr>
      <Tr><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td></Tr>
      <Tr><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td><Td><Skeleton height="20px" /></Td></Tr>
    </>
  );
  
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Box flex="1">
        <Flex mb={6} alignItems="center">
          <Heading>Manajemen Perangkat</Heading>
          <Spacer />
          <Button 
            colorScheme="teal" 
            leftIcon={<AddIcon />}
            onClick={() => navigate('/dashboard/devices/new')}
          >
            Tambah Perangkat Baru
          </Button>
        </Flex>

        <Box borderWidth="1px" borderRadius="lg" boxShadow="lg" bg={tableBg}>
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Nama</Th>
                  <Th>IP Address</Th>
                  <Th>Cluster</Th>
                  <Th>Status</Th>
                  <Th>Latency</Th>
                  <Th>Aksi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  <TableSkeleton />
                ) : devices.length > 0 ? (
                  devices.map((device) => (
                    <Tr key={device.id}>
                      <Td>{device.name}</Td>
                      <Td>{device.ip_address}</Td>
                      <Td>{device.cluster}</Td>
                      <Td>
                        <Badge colorScheme={device.status === 'online' ? 'green' : 'red'}>
                          {device.status}
                        </Badge>
                      </Td>
                      <Td>{device.latency}</Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            colorScheme="yellow"
                            aria-label="Edit perangkat"
                            icon={<EditIcon />}
                            size="sm"
                            onClick={() => navigate(`/dashboard/devices/edit/${device.id}`)}
                          />
                          <IconButton
                            colorScheme="red"
                            aria-label="Hapus perangkat"
                            icon={<DeleteIcon />}
                            size="sm"
                            onClick={() => openDeleteDialog(device.id)}
                          />
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={6}>
                      <VStack py={10}>
                        <Heading size="md" color="gray.500">Belum Ada Perangkat</Heading>
                        <Text color="gray.500">Silakan tambahkan perangkat baru untuk memulai monitoring.</Text>
                      </VStack>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">Hapus Perangkat</AlertDialogHeader>
              <AlertDialogBody>
                Apakah Anda yakin ingin menghapus perangkat ini? Aksi ini tidak bisa dibatalkan.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>Batal</Button>
                <Button colorScheme="red" onClick={confirmDelete} ml={3}>Hapus</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
      <Footer />
    </Box>
  );
};

export default DevicesPage;