import React from 'react';
import { Box, Stat, StatLabel, StatNumber, StatHelpText, useColorModeValue } from '@chakra-ui/react';

const StatCard = ({ title, stat, helpText }) => {
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
      <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  );
};

export default StatCard;