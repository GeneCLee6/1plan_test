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

export default function SectionType2({ title, headers, rows }) {
  return (
    <>
      <Box>
        <Heading size="xs" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box py="2" px="5">
        <TableContainer>
          <Table variant="unstyled" size="xs">
            <Thead>
              <Tr>
                {headers.map(({ label, width }, i) => (
                  <Th key={i}>
                    <Flex justifyContent={'center'} mb="10px">
                      <Text
                        whiteSpace={'normal'}
                        w={width}
                        fontWeight={'normal'}
                        fontSize={'10px'}
                        textTransform={'none'}
                      >
                        {label}
                      </Text>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {Object.values(rows).map(([e1, e2, e3], i) => (
                <Tr key={i}>
                  <Td>
                    <Flex alignItems={'center'} mb="3">
                      <Text mr="2" fontSize={'11px'}>
                        {i + 1}
                      </Text>
                      <Text
                        whiteSpace={'normal'}
                        bgColor={'#F1F3F6'}
                        w="80px"
                        height="55px"
                        fontSize={'10px'}
                      >
                        {e1}
                      </Text>
                    </Flex>
                  </Td>
                  <Td className="table-td">
                    <Flex
                      bgColor={'#F1F3F6'}
                      w="100%"
                      height="55px"
                      fontSize={'10px'}
                      mb="3"
                      whiteSpace={'normal'}
                      mx="1"
                      ml="-1"
                      justifyContent={'center'}
                      alignItems="center"
                    >
                      <Text>{e2}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex
                      bgColor={'#F1F3F6'}
                      w="100%"
                      height="55px"
                      fontSize={'10px'}
                      mb="3"
                      whiteSpace={'normal'}
                      justifyContent={'center'}
                      alignItems="center"
                    >
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
