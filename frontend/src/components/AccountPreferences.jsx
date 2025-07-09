import React from 'react';
import { VStack, Select, Text } from '@chakra-ui/react';

const AccountPreferences = () => {
  return (
    <VStack align="stretch" spacing={4}>
      <Text>Bahasa Preferensi</Text>
      <Select placeholder="Pilih bahasa">
        <option value="id">Indonesia</option>
        <option value="en">English</option>
      </Select>
      <Text>Zona Waktu</Text>
      <Select placeholder="Pilih zona waktu">
        <option value="WIB">WIB (UTC+7)</option>
        <option value="WITA">WITA (UTC+8)</option>
        <option value="WIT">WIT (UTC+9)</option>
      </Select>
    </VStack>
  );
};

export default AccountPreferences;