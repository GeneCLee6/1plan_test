import {
  Box,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Input,
} from '@chakra-ui/react';
import { Field, FieldArray } from 'formik';
import React, { useEffect, useState } from 'react';

export default function FourSelectionTable({
  props,
  options,
  placeholders,
  isShow,
  width,
}) {
  const values = Object.values(props?.values);
  const [isShowInput, setIsShowInput] = useState([false, false, false, false]);
  const iniPlaceholderIndex = values.map((v, i) => {
    const arry = options.indexOf(v[0]);
    return arry;
  });
  const [placeholderIndex, setPlaceholderIndex] = useState(iniPlaceholderIndex);
  const newIsShowInput = [...isShowInput];
  useEffect(() => {
    values.forEach((v, i) => {
      if (v[0] === 'Other - write your own') newIsShowInput[i] = true;
      setIsShowInput(newIsShowInput);
    });
  }, []);

  return (
    <>
      <Box width={'100%'}>
        <TableContainer>
          <Table variant={'unstyled'}>
            <Tbody>
              {Object.values(props.values).map((v, i) => (
                <FieldArray
                  key={i}
                  name={`a${i + 1}`}
                  render={(arrayHelpers) => (
                    <>
                      <Tr>
                        <Td>{i + 1}.</Td>
                        <Td>
                          <Field name={`a${i + 1}.0`} key={i}>
                            {({ field, form }) => (
                              <Select
                                {...field}
                                id={`a${i + 1}.0`}
                                borderRadius={0}
                                onChange={(event) => {
                                  const { target, ...rest } = event;
                                  const newIsShowInput = [...isShowInput];
                                  const { value } = target.selectedOptions[0];
                                  newIsShowInput[i] =
                                    value == 'Other - write your own'
                                      ? true
                                      : false;
                                  setIsShowInput(newIsShowInput);
                                  placeholderIndex[i] = options.indexOf(value);
                                  props.values[`a${i + 1}`][0] = value;
                                }}
                              >
                                {options.map((o, index) => (
                                  <option value={o} key={index}>
                                    {o}
                                  </option>
                                ))}
                                <option value={'Other - write your own'}>
                                  Other - write your own
                                </option>
                              </Select>
                            )}
                          </Field>
                        </Td>
                        <Td verticalAlign={'bottom'}>
                          {!isShowInput[i] && (
                            <Field name={`a${i + 1}.1`} key={i}>
                              {({ field, form }) => (
                                <Input
                                  borderRadius="0"
                                  h="40px"
                                  w={width}
                                  p="1"
                                  {...field}
                                  id={`a${i + 1}.1`}
                                  type="text"
                                  placeholder={
                                    isShow
                                      ? placeholders[placeholderIndex[i]]
                                      : ''
                                  }
                                />
                              )}
                            </Field>
                          )}
                        </Td>
                      </Tr>
                      {isShowInput[i] && (
                        <Tr>
                          <Td></Td>
                          <Td>
                            <Field name={`a${i + 1}.2`} key={i}>
                              {({ field, form }) => (
                                <Input
                                  {...field}
                                  borderRadius="0"
                                  h="40px"
                                  w="100%"
                                  p="1"
                                  type="text"
                                  placeholder="Type what you want to measure here"
                                  mt={'2'}
                                />
                              )}
                            </Field>
                          </Td>
                          <Td>
                            <Field name={`a${i + 1}.1`} key={i}>
                              {({ field, form }) => (
                                <Input
                                  borderRadius="0"
                                  h="40px"
                                  w={width}
                                  p="1"
                                  {...field}
                                  id={`a${i + 1}.1`}
                                  type="text"
                                  placeholder={
                                    isShow
                                      ? 'How you will measure it and time period'
                                      : ''
                                  }
                                />
                              )}
                            </Field>
                          </Td>
                        </Tr>
                      )}
                    </>
                  )}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
