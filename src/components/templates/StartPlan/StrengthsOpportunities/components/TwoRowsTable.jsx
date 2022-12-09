import {
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Field, FieldArray } from 'formik';

export const TwoRowsTable = ({
  colunm1,
  column2,
  index1,
  index2,
  isShow,
  placeholders,
}) => {
  return (
    <>
      <TableContainer>
        <Table variant={'unstyled'}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th
                textTransform={'none'}
                textAlign="start"
                fontSize={'16px'}
                fontWeight={'400'}
              >
                {colunm1}
              </Th>
              <Th
                textTransform={'none'}
                textAlign="start"
                fontSize={'16px'}
                fontWeight={'400'}
              >
                {column2}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <FieldArray
              key={index1}
              name={`a${index1 + 1}`}
              render={(arrayHelpers) => (
                <Tr key={index1}>
                  <Td>1.</Td>
                  <Td>
                    <Field name={`a${index1 + 1}.0`}>
                      {({ field, form }) => (
                        <Input
                          borderRadius="0"
                          h="60px"
                          p="1"
                          {...field}
                          id={`a${index1 + 1}.0`}
                          type="text"
                          placeholder={isShow ? placeholders[0] : ''}
                        ></Input>
                      )}
                    </Field>
                  </Td>
                  <Td>
                    <Field name={`a${index1 + 1}.1`}>
                      {({ field, form }) => (
                        <Input
                          borderRadius="0"
                          h="60px"
                          p="1"
                          {...field}
                          id={`a${index1 + 1}.1`}
                          type="text"
                          placeholder={isShow ? placeholders[1] : ''}
                        ></Input>
                      )}
                    </Field>
                  </Td>
                </Tr>
              )}
            />
            <FieldArray
              key={index2}
              name={`a${index2 + 1}`}
              render={(arrayHelpers) => (
                <Tr key={index2}>
                  <Td>2.</Td>
                  <Td>
                    <Field name={`a${index2 + 1}.0`}>
                      {({ field, form }) => (
                        <Input
                          borderRadius="0"
                          h="60px"
                          p="1"
                          {...field}
                          id={`a${index2 + 1}.0`}
                          type="text"
                          placeholder={isShow ? placeholders[2] : ''}
                        ></Input>
                      )}
                    </Field>
                  </Td>
                  <Td>
                    <Field name={`a${index2 + 1}.1`}>
                      {({ field, form }) => (
                        <Input
                          borderRadius="0"
                          h="60px"
                          p="1"
                          {...field}
                          id={`a${index2 + 1}.1`}
                          type="text"
                          placeholder={isShow ? placeholders[3] : ''}
                        ></Input>
                      )}
                    </Field>
                  </Td>
                </Tr>
              )}
            />
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
