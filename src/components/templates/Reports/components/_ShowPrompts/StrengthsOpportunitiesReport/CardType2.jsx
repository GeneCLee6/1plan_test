import React from 'react';
import { Box, Heading, Flex, Text, Spacer } from '@chakra-ui/react';

export default function SectionType1({ title, subtitle, list }) {
  return (
    <>
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box py="2" px="5">
        <Text color="#4D4343" mb={'10px'} fontSize={'13px'}>
          {subtitle}
        </Text>
        {list.map(({ label, content }, i) => (
          <Flex
            key={i}
            mb="12px"
            fontSize={'13px'}
            alignItems="center"
            justifyContent={'center'}
            height={'55px'}
          >
            <Text mr="10px">{i + 1}</Text>
            <Text bgColor={'#F1F3F6'} w="120%" px="5px" h={'60px'}>
              {label}
            </Text>
            <Text w="80%" bgColor={'#F1F3F6'} ml={4} pl={1} h={'60px'}>
              {content}
            </Text>
          </Flex>
        ))}
      </Box>
    </>
  );
}
