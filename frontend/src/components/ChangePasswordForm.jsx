import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: 'Password baru tidak cocok', status: 'error', duration: 3000, isClosable: true });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/change-password', {
        currentPassword,
        newPassword
      });
      toast({ title: response.data.msg, status: 'success', duration: 3000, isClosable: true });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast({ title: 'Gagal mengubah password', description: error.response?.data?.msg, status: 'error', duration: 5000, isClosable: true });
    }
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch" maxW="400px">
      <FormControl isRequired>
        <FormLabel>Password Saat Ini</FormLabel>
        <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password Baru</FormLabel>
        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Konfirmasi Password Baru</FormLabel>
        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </FormControl>
      <Button type="submit" colorScheme="teal" alignSelf="flex-start">
        Ubah Password
      </Button>
    </VStack>
  );
};

export default ChangePasswordForm;