import React from 'react';
import { Flex, Text, Switch, useColorMode } from '@chakra-ui/react';

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex align="center">
      <Text mr={4}>Gunakan Tema Gelap (Dark Mode)</Text>
      <Switch 
        isChecked={isDark} 
        onChange={toggleColorMode} 
        colorScheme="teal"
      />
    </Flex>
  );
};

export default ThemeSwitcher;