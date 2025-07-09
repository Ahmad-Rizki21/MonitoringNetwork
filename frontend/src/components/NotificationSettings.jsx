import React from 'react';
import { VStack, Checkbox, Text } from '@chakra-ui/react';

const NotificationSettings = () => {
  return (
    <VStack align="stretch" spacing={4}>
      <Checkbox defaultChecked>Terima notifikasi email</Checkbox>
      <Checkbox>Terima notifikasi push</Checkbox>
      <Checkbox>Berlangganan newsletter</Checkbox>
    </VStack>
  );
};

export default NotificationSettings;