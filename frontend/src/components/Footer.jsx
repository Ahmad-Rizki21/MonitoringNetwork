import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
    //   bg="gray.800"
      color="black"
      py={4}
      textAlign="center"
    >
      <Text>
        © {currentYear} Artacom FTTH Monitor. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;