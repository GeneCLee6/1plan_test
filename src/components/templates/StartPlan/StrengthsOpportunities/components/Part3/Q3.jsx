import React from 'react';
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
  cookieStorageManager,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { lazy, useContext } from 'react';
import { tradinglabel } from '../config';
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

export default function Q3({ setStep, values, isShowPlaceholder }) {
  const {
    contextValue: { strengthsOpportunities },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

  const placeholders = ['6', '51', '5'];

  let initialValues = {
    a1: '',
    a2: '',
    a3: '',
  };
  if (values) {
    const [a1, a2, a3] = values;
    initialValues = { a1, a2, a3 };
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
        Part 3 – DRIVERS AND KPIs
      </Heading>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text fontSize={'16px'} fontWeight={'bold'} mb={'5'}>
            3. Please complete the following table:
          </Text>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const oldAns = strengthsOpportunities.part3?.q3?.answers;
              let wasAnswered = false;
              if (oldAns) {
                const [oldAnsA1, oldAnsA2, oldAnsA3] = oldAns;
                if (
                  String(oldAnsA1).trim() != '' &&
                  String(oldAnsA2).trim() != '' &&
                  String(oldAnsA3).trim() != ''
                ) {
                  wasAnswered = true;
                }
              }
              const { submitBtn, ...rest } = values;
              const steps = {
                Skip: 3.3,
                Previous: 3.1,
                Continue: 3.3,
              };
              if (submitBtn === 'Continue') {
                const answers = Object.values(rest);
                const q3 = {
                  ...strengthsOpportunities?.part3?.q3,
                  answers,
                };
                const [ansA1, ansA2, ansA3] = answers;
                let isAnswered = false;
                if (
                  String(ansA1).trim() != '' &&
                  String(ansA2).trim() != '' &&
                  String(ansA3).trim() != ''
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

                let data = {
                  'section3.part3.q3.answers': answers,
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
                  updateSection('strengthsOpportunities', 'part3', { q3 });
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
                            Trading Days
                          </Th>
                          <Th></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.values(props.values).map((v, i) => {
                          return (
                            <Field name={`a${i + 1}`} key={i}>
                              {({ field, form }) => {
                                return (
                                  <Tr>
                                    <Td>{i + 1}.</Td>
                                    <Td>{tradinglabel[i]}</Td>
                                    <Td>
                                      <Input
                                        borderRadius="0"
                                        h="60px"
                                        w="150px"
                                        p="1"
                                        {...field}
                                        id={`a${i + 1}`}
                                        placeholder={
                                          isShowPlaceholder
                                            ? placeholders[i]
                                            : ''
                                        }
                                        type="number"
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
    </>
  );
}
