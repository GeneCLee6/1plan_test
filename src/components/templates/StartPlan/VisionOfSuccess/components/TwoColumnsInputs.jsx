import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Input,
} from '@chakra-ui/react';
export default function TwoColumnsInputs({
  headers,
  values,
  isShow,
  placeholders,
}) {
  return (
    <>
      <TableContainer mt="5">
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th></Th>
              {headers.map((h, i) => (
                <Th key={i} textTransform={'none'} textAlign="center">
                  {h}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Object.values(values).map((v, i) => (
              <FieldArray
                key={i}
                name={`a${i + 1}.0`}
                render={(arrayHelpers) => (
                  <Tr key={i}>
                    <Td>{i + 1}. </Td>
                    <Td>
                      <Field name={`a${i + 1}.0`}>
                        {({ field, form }) => (
                          <Input
                            borderRadius={0}
                            h="50px"
                            p="1"
                            {...field}
                            id={`a${i + 1}.0`}
                            type="text"
                            placeholder={isShow ? placeholders[0][i] : ''}
                          />
                        )}
                      </Field>
                    </Td>
                    <Td>
                      <Field name={`a${i + 1}.1`}>
                        {({ field, form }) => (
                          <Input
                            borderRadius="0"
                            h="50px"
                            p="1"
                            {...field}
                            id={`a${i + 1}.1`}
                            type="text"
                            placeholder={isShow ? placeholders[1][i] : ''}
                          />
                        )}
                      </Field>
                    </Td>
                  </Tr>
                )}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
