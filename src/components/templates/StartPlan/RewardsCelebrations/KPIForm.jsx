import React from 'react';
import { Field, FieldArray } from 'formik';
import {
  Box,
  Input,
  Text,
  Flex,
  Grid,
  GridItem,
  Select,
} from '@chakra-ui/react';

export default function KPIForm({ values, pageNo, isShow, placeholders }) {
  console.log(isShow + 123);
  console.log(placeholders);

  return (
    <>
      <Grid
        my={5}
        templateColumns="1fr 4fr 2fr 2fr 2fr 2fr"
        templateRows="repeat(4, 1fr)"
        gap={3}
      >
        <GridItem colStart={3}>100% of KPI achieve</GridItem>
        <GridItem>80% of KPI achieve</GridItem>
        <GridItem>60% of KPI achieve</GridItem>
        <GridItem>40% of KPI achieve</GridItem>
        {Object.values(values).map((v, i) => {
          return (
            <React.Fragment key={i}>
              <FieldArray
                name={`a${i + 1}`}
                render={(arrayHelpers) => (
                  <>
                    <GridItem
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      {i + 1}
                    </GridItem>
                    <GridItem my={4}>
                      <Field
                        type="text"
                        name={pageNo == 2 ? `a${i + 1}.0` : `q5.a${i + 1}.0`}
                      >
                        {({ field, form, meta }) => (
                          <Input
                            borderRadius={0}
                            h="50px"
                            p="1"
                            id={pageNo == 2 ? `a${i + 1}.0` : `q5.a${i + 1}.0`}
                            {...field}
                            placeholder={isShow ? placeholders[i] : ''}
                          />
                        )}
                      </Field>
                    </GridItem>
                    {[...Array(4)].map((e, index) => {
                      return (
                        <GridItem my={4} key={index}>
                          <Box
                            display={'flex'}
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                            h="50px"
                          >
                            <Field
                              type="number"
                              name={
                                pageNo == 2
                                  ? `a${i + 1}.${index + 1}.value`
                                  : `q5.a${i + 1}.${index + 1}.value`
                              }
                              //value={v[index + 1].value}
                            >
                              {({ field, form, meta }) => (
                                <>
                                  <Input
                                    borderRadius="0"
                                    h="50px"
                                    ml="1"
                                    p="0"
                                    id={
                                      pageNo == 2
                                        ? `a${i + 1}.${index + 1}.value`
                                        : `q5.a${i + 1}.${index + 1}.value`
                                    }
                                    {...field}
                                  />
                                </>
                              )}
                            </Field>
                            <Field
                              name={
                                pageNo == 2
                                  ? `a${i + 1}.${index + 1}.unit`
                                  : `q5.a${i + 1}.${index + 1}.unit`
                              }
                            >
                              {({ field, form, meta }) => (
                                <>
                                  <Select
                                    h="50px"
                                    bg="#F3F2F2"
                                    size="xs"
                                    //defaultValue={v[index + 1].unit}
                                    {...field}
                                  >
                                    <option value={'%'}>%</option>
                                    <option value={'($)'}>$</option>
                                  </Select>
                                </>
                              )}
                            </Field>
                          </Box>
                        </GridItem>
                      );
                    })}
                  </>
                )}
              />
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
}
