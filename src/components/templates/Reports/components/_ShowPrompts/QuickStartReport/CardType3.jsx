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
                    <Flex
                      alignItems={'center'}
                      mb="10px"
                      whiteSpace={'normal'}
                      height="40px"
                      fontSize={'13px'}
                      fontWeight={'normal'}
                      textTransform={'none'}
                    >
                      <Text>{label}</Text>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {Object.values(rows).map(([e1, e2, e3], i) => (
                <Tr key={i}>
                  <Td>
                    <Text mr="2">{i + 1}</Text>
                  </Td>
                  <Td>
                    <Flex
                      alignItems={'center'}
                      mb="3"
                      px="2"
                      whiteSpace={'normal'}
                      bgColor={'#F1F3F6'}
                      w="180px"
                      height="55px"
                      fontSize={'13px'}
                    >
                      <Text>{e1}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex
                      bgColor={'#F1F3F6'}
                      w="130px"
                      fontSize={'12px'}
                      height="55px"
                      mb="3"
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
