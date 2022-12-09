import React from 'react';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';

export default function SectionType1({ title, description }) {
  return (
    <>
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box py="2" px="5">
        <Text color="#4D4343" my="15px" fontSize={'13px'}>
          {description}
        </Text>
      </Box>
    </>
  );
}
