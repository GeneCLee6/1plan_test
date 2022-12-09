import {
  Box,
  Heading,
  Text,
  Flex,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Input,
  Center,
} from '@chakra-ui/react';
import React, { useContext, lazy } from 'react';
import { Field, Form, Formik } from 'formik';
import { q6icon, q6label } from '../config';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../../config';

const ContinueStepButton = lazy(() =>
  import('components/ui/start-plan/ContinueStepButton')
);
const PreviousStepButton = lazy(() =>
  import('components/ui/start-plan/PreviousStepButton')
);
const SkipStepButton = lazy(() =>
  import('components/ui/start-plan/SkipStepButton')
);

export default function Q6({ setStep, values, isShowPlaceholder }) {
  const {
    contextValue: { strengthsOpportunities },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

  const placeholders = ['120,000', '180,000', '20,000', '30 hours'];

  let initialValues = {
    a1: '',
    a2: '',
    a3: '',
    a4: '',
  };
  if (values) {
    const [a1, a2, a3, a4] = values;
    initialValues = { a1, a2, a3, a4 };
  }
  return (
    <>
      <Box bg="#F7F9FA" border={'1px solid #E4E5E7'} px={'5'} py="5">
        <Heading fontSize={'20px'} fontWeight={'700'}>
          Part 3 – DRIVERS AND KPIs
        </Heading>
        <Text fontSize={'14px'} py={1}>
          Owners and Shareholders
        </Text>
      </Box>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text fontSize={'16px'} fontWeight={'bold'}>
            6. How much per year do the Owners and Shareholders want to earn
            from your business?
          </Text>
          <Text fontSize={'14px'} mb={'5'}>
            Include everything such as dividends, your wages, profits, bonuses
            etc. before tax. If you were not in business last year, use your
            income from other sources of employment. If there is more than one
            owner, enter a dollar amount as a combined total
          </Text>
          <>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                const oldAns = strengthsOpportunities.part3?.q6?.answers;
                let wasAnswered = false;
                if (oldAns) {
                  const [oldAnsA1, oldAnsA2, oldAnsA3, oldAnsA4] =
                    Object.values(oldAns);
                  if (
                    String(oldAnsA1).trim() != '' &&
                    String(oldAnsA2).trim() != '' &&
                    String(oldAnsA3).trim() != '' &&
                    String(oldAnsA4).trim() != ''
                  ) {
                    wasAnswered = true;
                  }
                }

                const { submitBtn, ...rest } = values;
                const steps = {
                  Skip: 3.6,
                  Previous: 3.4,
                  Continue: 3.6,
                };
                if (submitBtn === 'Continue') {
                  const answers = Object.values(rest);
                  const [ansA1, ansA2, ansA3, ansA4] = Object.values(answers);
                  let isAnswered = false;
                  if (
                    String(ansA1).trim() != '' &&
                    String(ansA2).trim() != '' &&
                    String(ansA3).trim() != '' &&
                    String(ansA4).trim() != ''
                  ) {
                    isAnswered = true;
                  }
                  let newProgress = +strengthsOpportunities.progress;
                  let totalAnswered = +strengthsOpportunities.totalAnswered;
                  if (isAnswered && !wasAnswered) {
                    newProgress += Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                    totalAnswered++;
                  }
                  if (!isAnswered && wasAnswered) {
                    newProgress -= Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                    totalAnswered--;
                  }
                  if (newProgress > 100) newProgress = 100;
                  const q6 = {
                    ...strengthsOpportunities?.part3?.q6,
                    answers,
                  };

                  let data = {
                    'section3.part3.q6.answers': answers,
                    'section3.totalAnswered': totalAnswered,
                  };
                  if (newProgress >= 0) {
                    data = {
                      ...data,
                      'section3.progress': newProgress,
                    };
                  }
                  const { status } = await updateData(
                    'planSections',
                    strengthsOpportunities._id,
                    data
                  );
                  if (status) {
                    if (newProgress >= 0)
                      setProgress('strengthsOpportunities', newProgress);
                    setTotalAnswered('strengthsOpportunities', totalAnswered);
                    updateSection('strengthsOpportunities', 'part3', { q6 });
                    setStep(steps[submitBtn]);
                  } else {
                    alert('Something went wrong. Try again.');
                  }
                } else {
                  setStep(steps[submitBtn]);
                }
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
                  <Box width={'100%'}>
                    <TableContainer>
                      <Table variant={'unstyled'}>
                        <Tbody>
                          {Object.values(props.values).map((v, i) => (
                            <Field name={`a${i + 1}`} key={i}>
                              {({ field, form }) => {
                                return (
                                  <Tr>
                                    <Td textAlign={'center'}>{i + 1}.</Td>
                                    <Td width={'330px'}>{q6label[i]}</Td>
                                    <Td>
                                      <Flex>
                                        {q6icon[i] ? (
                                          <Center width={'16px'} bg={'#F3F2F2'}>
                                            $
                                          </Center>
                                        ) : (
                                          <Box width={'16px'}></Box>
                                        )}
                                        <Input
                                          borderRadius="0"
                                          h="50px"
                                          w={'150px'}
                                          p="3"
                                          {...field}
                                          id={`a${i + 1}`}
                                          type="number"
                                          placeholder={
                                            isShowPlaceholder
                                              ? placeholders[i]
                                              : ''
                                          }
                                        />
                                      </Flex>
                                    </Td>
                                  </Tr>
                                );
                              }}
                            </Field>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <br />
                  <Flex my="5" justifyContent={'end'}>
                    <SkipStepButton isSubmitting={props.isSubmitting} />
                    <Box mx="5">
                      <PreviousStepButton isSubmitting={props.isSubmitting} />
                    </Box>
                    <ContinueStepButton isSubmitting={props.isSubmitting} />
                  </Flex>
                </Form>
              )}
            </Formik>
          </>
        </Box>
      </Box>
    </>
  );
}
