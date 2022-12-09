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
  Th,
  Image,
  Thead,
} from '@chakra-ui/react';

export default function SectionType1({ title, headers, rows }) {
  return (
    <>
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box py="2" px="5">
        <TableContainer>
          <Table variant="unstyled" size="xs">
            <Thead>
              <Tr>
                <Th></Th>
                {headers.map(({ label }, i) => (
                  <Th key={i}>
                    <Flex justifyContent={'center'} mb="10px" fontSize={'13px'}>
                      <Text
                        whiteSpace={'normal'}
                        w="150px"
                        fontWeight={'normal'}
                      >
                        {label}
                      </Text>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {Object.values(rows).map(([e1, e2, e3, e4, e5], i) => (
                <Tr key={i}>
                  <Td>
                    <Text fontSize={'13px'} mr="2">
                      {i + 1}
                    </Text>
                  </Td>
                  <Td>
                    <Flex
                      alignItems={'center'}
                      mb="4"
                      px="2"
                      whiteSpace={'normal'}
                      bgColor={'#F1F3F6'}
                      w="130px"
                      height="75px"
                      fontSize={'13px'}
                    >
                      <Text>{e1}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex
                      bgColor={'#F1F3F6'}
                      w="130px"
                      fontSize={'13px'}
                      height="75px"
                      mb="4"
                      px="2"
                      whiteSpace={'normal'}
                      direction="column"
                      justifyContent={'center'}
                    >
                      <Text>{e2}</Text>
                      <Text>{e3}</Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
