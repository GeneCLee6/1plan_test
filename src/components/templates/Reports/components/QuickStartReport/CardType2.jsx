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

export default function SectionType1({ title, list, image }) {
  return (
    <>
      <Box>
        <Heading size="sm" py="2" textAlign={'center'} bgColor="#EFF1F1">
          {title}
        </Heading>
      </Box>
      <Box py="2" px="5">
        <TableContainer>
          <Table variant="unstyled" size="sm">
            <Tbody>
              {list.map(({ label, content }, i) => (
                <Tr key={i}>
                  <Td p="0">
                    <Text
                      color="#4D4343"
                      fontSize={'14px'}
                      my="7px"
                      whiteSpace={'normal'}
                      w="100px"
                    >
                      {label}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      bgColor="#F1F3F6"
                      fontSize={'13px'}
                      my="7px"
                      whiteSpace={'normal'}
                      w="100%"
                      px="5px"
                      py="8px"
                      h="30px"
                    >
                      {content}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Text color="#4D4343" fontSize={'14px'}>
          Image that excites you
        </Text>
        <Flex justifyContent={'center'} mt="20px" bg="#F1F3F6" h="160px">
          <Image src={image} fit={'contain'} />
        </Flex>
      </Box>
    </>
  );
}
