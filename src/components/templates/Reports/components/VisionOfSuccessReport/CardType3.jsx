import React from 'react';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';

export default function SectionType1({ title, subtitle, list }) {
  return (
    <>
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box px="5" py={'2'}>
        <Text color="#4D4343" fontWeight="bold" fontSize={'13px'} mb={'20px'}>
          {subtitle}
        </Text>
        {list.map((x, i) => (
          <Flex key={i} mb="7px" fontSize={'13px'} alignItems={'center'}>
            <Text mr="10px" my="2" py="1">
              {i + 1}
            </Text>
            <Text
              bgColor={'#F1F3F6'}
              my="2"
              py="1"
              px="1"
              w="100%"
              height={'50px'}
            >
              {x}
            </Text>
          </Flex>
        ))}
      </Box>
    </>
  );
}
