import React from 'react';
import {
  TableContainer,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Input,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import { Field, FieldArray } from 'formik';

export const TableNoSign = ({
  question,
  rowTitle,
  index,
  isShow,
  placeholders,
}) => {
  return (
    <>
      <Text>{question}</Text>
      <TableContainer mt={'5'}>
        <Table variant={'unstyled'}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th textTransform={'none'} textAlign={'center'}>
                90 days
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 1
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 3
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 10
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <FieldArray
              key={index}
              name={`a${index + 1}`}
              render={(arrayHelpers) => (
                <Tr key={index}>
                  <Td whiteSpace={'normal'} textAlign={'center'}>
                    <Box width={'169px'}>{rowTitle}</Box>
                  </Td>

                  {['', '', '', ''].map((_, i) => (
                    <Td key={i}>
                      <Flex justifyContent={'center'}>
                        <Field name={`a${index + 1}.${i}`} key={i}>
                          {({ field, form }) => (
                            <Input
                              textAlign={'center'}
                              borderRadius={0}
                              width={'80%'}
                              h="50px"
                              p="1"
                              {...field}
                              id={`a${index + 1}.${i}`}
                              type="number"
                              placeholder={isShow ? placeholders[i] : ''}
                            />
                          )}
                        </Field>
                      </Flex>
                    </Td>
                  ))}
                </Tr>
              )}
            />
          </Tbody>
        </Table>
      </TableContainer>
      <br />
    </>
  );
};

export const TableDollarSign = ({
  question,
  rowTitle,
  index,
  isShow,
  placeholders,
}) => {
  return (
    <>
      <Text>{question}</Text>
      <TableContainer mt={'5'}>
        <Table variant={'unstyled'}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th textTransform={'none'} textAlign={'center'}>
                90 days
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 1
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 3
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 10
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <FieldArray
              key={index}
              name={`a${index + 1}`}
              render={(arrayHelpers) => (
                <Tr key={index}>
                  <Td whiteSpace={'normal'} textAlign={'center'}>
                    <Text width={'169px'}>{rowTitle}</Text>
                  </Td>
                  {['', '', '', ''].map((_, i) => (
                    <Td key={i}>
                      <Flex justifyContent={'center'}>
                        <Box
                          display={'flex'}
                          alignItems="center"
                          justifyContent="center"
                          w={'80%'}
                          border="1px solid #E4E5E7"
                          h="50px"
                        >
                          <Flex
                            bg="#F3F2F2"
                            px="1"
                            left="0"
                            top="0"
                            h="100%"
                            alignItems={'center'}
                          >
                            <Text>$</Text>
                          </Flex>
                          <Field name={`a${index + 1}.${i}`} key={i}>
                            {({ field, form }) => (
                              <Input
                                textAlign={'center'}
                                border="0"
                                borderRadius="0"
                                h="50px"
                                p="1"
                                {...field}
                                id={`a${index + 1}.${i}`}
                                type="number"
                                placeholder={isShow ? placeholders[i] : ''}
                              />
                            )}
                          </Field>
                        </Box>
                      </Flex>
                    </Td>
                  ))}
                </Tr>
              )}
            />
          </Tbody>
        </Table>
      </TableContainer>
      <br />
    </>
  );
};

export const TablePercentageSign = ({
  question,
  rowTitle,
  index,
  isShow,
  placeholders,
}) => {
  return (
    <>
      <Text>{question}</Text>
      <TableContainer mt={'5'}>
        <Table variant={'unstyled'}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th textTransform={'none'} textAlign={'center'}>
                90 days
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 1
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 3
              </Th>
              <Th textTransform={'none'} textAlign={'center'}>
                year 10
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <FieldArray
              key={index}
              name={`a${index + 1}`}
              render={(arrayHelpers) => (
                <Tr key={index}>
                  <Td whiteSpace={'normal'} textAlign={'center'}>
                    <Text width={'169px'}>{rowTitle}</Text>
                  </Td>

                  {['', '', '', ''].map((_, i) => (
                    <Td key={i}>
                      <Flex justifyContent={'center'}>
                        <Box
                          display={'flex'}
                          alignItems="center"
                          justifyContent="center"
                          border="1px solid #E4E5E7"
                          w={'50%'}
                          position={'relative'}
                          h="50px"
                        >
                          <Field name={`a${index + 1}.${i}`} key={i}>
                            {({ field, form }) => (
                              <Input
                                textAlign={'center'}
                                borderRadius="0"
                                border={'0'}
                                h="50px"
                                p="1"
                                {...field}
                                id={`a${index + 1}.${i}`}
                                type="number"
                                placeholder={isShow ? placeholders[i] : ''}
                              />
                            )}
                          </Field>
                          <Flex
                            bg="#F3F2F2"
                            px=""
                            position={'absolute'}
                            top="0"
                            right={'0'}
                            h="100%"
                            alignItems={'center'}
                          >
                            <Text>%</Text>
                          </Flex>
                        </Box>
                      </Flex>
                    </Td>
                  ))}
                </Tr>
              )}
            />
          </Tbody>
        </Table>
      </TableContainer>
      <br />
    </>
  );
};

export const SingleTableField = ({
  rowTitle,
  index,
  question,
  isShow,
  placeholders,
}) => {
  return (
    <>
      <Text>{question}</Text>
      <TableContainer mt={'5'}>
        <Table variant={'unstyled'}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th textTransform={'none'} textAlign={'center'}>
                90 days
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Box textAlign={'center'}>{rowTitle}</Box>
              </Td>
              <Td>
                <Flex justifyContent={'center'}>
                  <Field name={`a${index + 1}`}>
                    {({ field, form }) => (
                      <Input
                        textAlign={'center'}
                        borderRadius={0}
                        h="51px"
                        width={'60%'}
                        p="1"
                        {...field}
                        id={`a${index + 1}`}
                        type="number"
                        placeholder={isShow ? placeholders : ''}
                      />
                    )}
                  </Field>
                </Flex>
              </Td>
              <Th></Th>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <br />
    </>
  );
};
