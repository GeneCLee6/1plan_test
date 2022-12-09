import {
  Box,
  Heading,
  Text,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Input,
} from '@chakra-ui/react';

import React, { lazy, useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import { q16hint, q16label } from '../config';
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

export default function Q16({ setStep, values, isShowPlaceholder }) {
  const {
    contextValue: { strengthsOpportunities },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

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
      <Heading
        px={'5'}
        py="7"
        fontSize={'20px'}
        fontWeight={'700'}
        bg="#F7F9FA"
        border={'1px solid #E4E5E7'}
      >
        Part 4 – ATTRACTING INVESTORS & VALUING YOUR BUSINESS
      </Heading>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text fontSize={'16px'} fontWeight={'bold'}>
            16. If the business has no income, then the value is likely in the
            clients or users you have. But if there is income and more
            importantly profit, then it is common to use a multiplier of
            maintainable earnings or a Profit to Equity multiple (PE ratio).
            This is how listed companies are often valued.
          </Text>
          <Text pt={'5'}>
            Multiple for unlisted companies are generally between 1 and 4 times
            profit whereas for listed companies it between 10 and 16 times.
            Hence the best way to maximise your value is to list or sell out to
            a listed company. The multiple for unlisted companies depends on a
            number of factors such as low/high barriers to entry, consistency of
            earnings or locked in future earnings, government policy outlook for
            the industry etc. To give you an indication of the value of your
            business, assuming there is a profit projected, we have used a
            multiple of 2.5 times Profit before owners’ drawing.
            Notwithstanding, if you are confident about you future multiple
            predictions, you and enter them here (optional)
          </Text>
          <Text pt={'3'}>Maintainable Profit X multiple = Valuation</Text>
          <br />
          <Box width={'100%'}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                const oldAns = strengthsOpportunities.part4?.q16?.answers;
                const wasAnswered = oldAns
                  ? oldAns.findIndex((a) => a.trim() != '') > -1
                  : false;

                const { submitBtn, ...rest } = values;
                const steps = {
                  Previous: 4.4,
                  Continue: 4.6,
                  Skip: 4.6,
                };
                if (submitBtn === 'Continue') {
                  const answers = Object.values(rest);
                  const isAnswered =
                    answers.findIndex((a) => a.trim() != '') > -1;
                  const q16 = {
                    ...strengthsOpportunities?.part4?.q16,
                    answers,
                  };
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
                  let data = {
                    'section3.part4.q16.answers': answers,
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
                    updateSection('strengthsOpportunities', 'part4', { q16 });
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
                        <Thead>
                          <Tr>
                            <Th></Th>
                            <Th
                              textTransform={'none'}
                              textAlign="start"
                              fontSize={'16px'}
                              fontWeight={'bold'}
                            >
                              Support Measurement
                            </Th>
                            <Th
                              textTransform={'none'}
                              textAlign="start"
                              fontSize={'16px'}
                              fontWeight={'bold'}
                            >
                              Support Measurement
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {Object.values(props.values).map((v, i) => {
                            return (
                              <Field name={`a${i + 1}`} key={i}>
                                {({ field, form }) => {
                                  return (
                                    <Tr>
                                      <Td w={'200px'} textAlign={'center'}>
                                        {i + 1}.
                                      </Td>
                                      <Td
                                        fontSize={'14px'}
                                        color={'rgba(0, 0, 0, 0.52)'}
                                      >
                                        {q16label[i]}
                                      </Td>
                                      <Td>
                                        <Input
                                          borderRadius="0"
                                          h="60px"
                                          w="200px"
                                          p="1"
                                          {...field}
                                          id={`a${i + 1}`}
                                          type="text"
                                          placeholder={
                                            isShowPlaceholder ? q16hint[i] : ''
                                          }
                                        />
                                      </Td>
                                    </Tr>
                                  );
                                }}
                              </Field>
                            );
                          })}
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
