import React from 'react';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';

export default function SectionType2({ title, subtitle, list }) {
  return (
    <>
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box py="2" px="5">
        <Text color="#4D4343" fontSize={'13px'} mb={'10px'}>
          {subtitle}
        </Text>
        {list.map((x, i) => (
          <Flex
            key={i}
            mb="7px"
            fontSize={'12px'}
            alignItems="center"
            bgColor={'#F1F3F6'}
            height={'50px'}
          >
            <Text mr="10px">{i + 1}</Text>
            <Text w="100%">{x}</Text>
          </Flex>
        ))}
      </Box>
    </>
  );
}
