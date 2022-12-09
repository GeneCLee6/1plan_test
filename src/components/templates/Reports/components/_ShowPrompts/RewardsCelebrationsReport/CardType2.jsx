import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Text,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Image,
} from '@chakra-ui/react';

export default function SectionType1({ title, image }) {
  return (
    <Flex flexDirection={'column'} h="100%">
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>

      <Flex
        h="180px"
        justifyContent={'center'}
        alignItems={'center'}
        mt="65px"
        bg="#F1F3F6"
      >
        <Image src={image} w="120px" fit={'contain'} />
      </Flex>
    </Flex>
  );
}
