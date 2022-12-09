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
  Thead,
} from '@chakra-ui/react';
import { ChakraImage } from 'utils/images';

export default function SectionType1({ title, headers, rows, image }) {
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
                <Th></Th>
                {headers.map(({ label, width }, i) => (
                  <Th key={i}>
                    <Flex
                      whiteSpace={'normal'}
                      w={width}
                      fontWeight={'normal'}
                      fontSize={'12px'}
                      textTransform={'none'}
                      mb="10px"
                      justifyContent={'center'}
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
                    <Text mr="2" mb="3" fontSize={'13px'}>
                      {i + 1}
                    </Text>
                  </Td>
                  <Td>
                    <Flex
                      whiteSpace={'normal'}
                      bgColor={'#F1F3F6'}
                      w="220px"
                      height="55px"
                      fontSize={'13px'}
                      mb="3"
                      alignItems={'center'}
                    >
                      <Text ml={2}>{e1}</Text>
                    </Flex>
                  </Td>
                  <Td className="table-td">
                    <Flex
                      bgColor={'#F1F3F6'}
                      w="80px"
                      height="55px"
                      fontSize={'13px'}
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
                      fontSize={'13px'}
                      mb="3"
                      whiteSpace={'normal'}
                      justifyContent={'center'}
                      alignItems="center"
                    >
                      <ChakraImage
                        src={e3}
                        width="30px"
                        height="30px"
                        objectFit="contain"
                      />
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
