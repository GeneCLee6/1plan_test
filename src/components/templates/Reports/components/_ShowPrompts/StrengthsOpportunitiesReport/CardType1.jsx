import React from 'react';
import { Box, Heading, Flex, Text } from '@chakra-ui/react';

export default function SectionType1({ title, list, question, action }) {
  return (
    <>
      <Box>
        <Heading size="sm" py="2" mb="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box px="5">
        {list.map((x, i) => (
          <Flex
            key={i}
            mb="7px"
            fontSize={'13px'}
            height={'50px'}
            alignItems={'center'}
          >
            <Text mr="10px">{i + 1}</Text>
            <Text
              bgColor={'#F1F3F6'}
              px="5px"
              my="1"
              py="1"
              w="100%"
              h={'50px'}
            >
              {x}
            </Text>
          </Flex>
        ))}
      </Box>
      <Box>
        <Text fontSize={'13px'} fontWeight="bold" w="100%" ml="16px" my={3}>
          {question}
        </Text>
      </Box>
      <Box px="5">
        {action.map((x, i) => (
          <Flex
            key={i}
            mb="7px"
            fontSize={'13px'}
            alignItems={'center'}
            height={'50px'}
          >
            <Text mr="10px" my="1" py="1">
              {i + 1}
            </Text>
            <Text
              bgColor={'#F1F3F6'}
              px="5px"
              my="1"
              py="1"
              w="100%"
              h={'50px'}
            >
              {x}
            </Text>
          </Flex>
        ))}
      </Box>
    </>
  );
}
