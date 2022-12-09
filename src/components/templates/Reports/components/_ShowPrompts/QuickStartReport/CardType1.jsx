import React from 'react';
import { Box, Heading, Flex, Text, Center } from '@chakra-ui/react';

export default function SectionType1({ title, subtitle, list }) {
  return (
    <>
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box py="2" px="5">
        <Text color="#4D4343" my="15px" fontSize={'14px'}>
          {subtitle}
        </Text>
        {list.map((x, i) => (
          <Flex key={i} mb="7px" fontSize={'13px'} height={'3rem'}>
            <Center>
              <Text mr="10px">{i + 1}</Text>
            </Center>
            <Text bgColor={'#F1F3F6'} w="100%" px="5px">
              {x}
            </Text>
          </Flex>
        ))}
      </Box>
    </>
  );
}
