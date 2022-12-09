import React, { lazy, useContext } from 'react';
import {
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from '@chakra-ui/react';
import { FIRST_STEP, LAST_STEP, TOTAL_QUESTIONS } from '../configs';
import { Formik, Form, Field, FieldArray } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { isSectionAnswered } from 'utils/common';

const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
const MeasureSelect = lazy(() => import('../MeasureSelect'));
export default function Page14({ values, setStep, isShowPlaceholder }) {
  const {
    contextValue: { visionOfSuccess },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);
  const placeholders = [
    'Our Brand',
    'Number of clients stocking',
    'Our brand on shelves',
    'Our home brand sales',
  ];
  const headers = [
    'My team Long-Term Goal # KPI',
    'Measure',
    'My owner Long-Term Goal $ KPI',
    'Measure',
  ];
  let initialValues = {
    a1: ['', '', '#', '', '', '$'],
    a2: ['', '', '#', '', '', '$'],
    a3: ['', '', '#', '', '', '$'],
    a4: ['', '', '#', '', '', '$'],
  };

  if (values) {
    const { a1, a2, a3, a4 } = values;
    initialValues = { a1, a2, a3, a4 };
  }

  return (
    <>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const { submitBtn, ...rest } = values;
              const { part4 } = visionOfSuccess;
              const wasAnswered = part4?.q10
                ? isSectionAnswered({ objArr: part4.q10.answers })
                : false;
              if (submitBtn === 'Continue') {
                const answers = rest;
                const q10 = {
                  ...visionOfSuccess.part4?.q10,
                  answers,
                };

                const isAnswered = isSectionAnswered({ objArr: answers });
                let newProgress = +visionOfSuccess.progress;
                let totalAnswered = +visionOfSuccess.totalAnswered;
                if (isAnswered && !wasAnswered) {
                  newProgress += Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered++;
                }
                if (!isAnswered && wasAnswered) {
                  newProgress -= Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered--;
                }
                console.log(
                  'P14 Q10: progress',
                  newProgress,
                  'totalAnswered:',
                  totalAnswered
                );
                let data = {
                  'section4.part4.q10.answers': answers,
                  'section4.totalAnswered': totalAnswered,
                };
                if (newProgress > 100) newProgress = 100;
                if (newProgress >= 0) {
                  data = {
                    ...data,
                    'section4.progress': newProgress,
                  };
                }

                const { status } = await updateData(
                  'planSections',
                  visionOfSuccess._id,
                  data
                );

                if (status) {
                  if (newProgress >= 0)
                    setProgress('visionOfSuccess', newProgress);
                  setTotalAnswered('visionOfSuccess', totalAnswered);
                  updateSection('visionOfSuccess', 'part4', { q10 });
                  setStep(4.15);
                } else {
                  alert('Something went wrong. Try again.');
                }
              }
              if (submitBtn === 'Skip') setStep(4.15);
              if (submitBtn === 'Previous') setStep(4.13);
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form
                onSubmit={(e) => {
                  const { name, value } = e.nativeEvent.submitter;
                  props.setFieldValue(name, value);
                  return props.handleSubmit(e);
                }}
              >
                <Text>
                  10. Now think about how to measure this. What is the best
                  result you think deserves a reward, remembering that anything
                  greater than 80% should be rewarded?
                </Text>
                <br />
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
                      {Object.values(props.values).map((v, i) => (
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
                                      placeholder={
                                        isShowPlaceholder ? placeholders[0] : ''
                                      }
                                    />
                                  )}
                                </Field>
                              </Td>
                              <Td>
                                <InputGroup
                                  border={'1px solid #E4E5E7'}
                                  size="md"
                                  h="100%"
                                  width={'140px'}
                                >
                                  <Field name={`a${i + 1}.1`}>
                                    {({ field, form }) => (
                                      <Input
                                        border={'transparent'}
                                        borderRadius={'0'}
                                        h="50px"
                                        p="1"
                                        width={'80px'}
                                        {...field}
                                        id={`a${i + 1}.1`}
                                        type="number"
                                        placeholder={
                                          isShowPlaceholder
                                            ? placeholders[1]
                                            : ''
                                        }
                                      />
                                    )}
                                  </Field>
                                  <InputRightElement
                                    width="4rem"
                                    display={'flex'}
                                    alignItems="center"
                                    border="transparent"
                                    h="100%"
                                  >
                                    <Field name={`a${i + 1}.2`}>
                                      {({ field, form }) => (
                                        <MeasureSelect field={field} />
                                      )}
                                    </Field>
                                  </InputRightElement>
                                </InputGroup>
                              </Td>
                              <Td>
                                <Field name={`a${i + 1}.3`}>
                                  {({ field, form }) => (
                                    <Input
                                      borderRadius="0"
                                      h="50px"
                                      p="1"
                                      {...field}
                                      id={`a${i + 1}.3`}
                                      type="text"
                                      placeholder={
                                        isShowPlaceholder ? placeholders[2] : ''
                                      }
                                    />
                                  )}
                                </Field>
                              </Td>
                              <Td>
                                <InputGroup
                                  size="md"
                                  h="100%"
                                  width={'140px'}
                                  border={'1px solid #E4E5E7'}
                                >
                                  <Field name={`a${i + 1}.4`}>
                                    {({ field, form }) => (
                                      <Input
                                        border={'transparent'}
                                        borderRadius="0"
                                        h="50px"
                                        width="80px"
                                        p="1"
                                        {...field}
                                        id={`a${i + 1}.4`}
                                        type="number"
                                        placeholder={
                                          isShowPlaceholder
                                            ? placeholders[3]
                                            : ''
                                        }
                                      />
                                    )}
                                  </Field>
                                  <InputRightElement
                                    width="4rem"
                                    display={'flex'}
                                    alignItems="center"
                                    border="transparent"
                                    h="100%"
                                  >
                                    <Field name={`a${i + 1}.5`}>
                                      {({ field, form }) => (
                                        <MeasureSelect field={field} />
                                      )}
                                    </Field>
                                  </InputRightElement>
                                </InputGroup>
                              </Td>
                            </Tr>
                          )}
                        />
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
                <br />
                <StepButtonGroup
                  currentStep={4.14}
                  firstStep={FIRST_STEP}
                  lastStep={LAST_STEP}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}
