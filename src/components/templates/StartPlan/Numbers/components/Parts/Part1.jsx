import {
  Box,
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import React, { useContext, useState, lazy } from 'react';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { UserContext } from 'contexts/UserProvider';
import { DatePickerField } from 'components/ui/DatePicker';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../../config';
const ContinueStepButton = lazy(() =>
  import('components/ui/start-plan/ContinueStepButton')
);
const SkipStepButton = lazy(() =>
  import('components/ui/start-plan/SkipStepButton')
);

export default function Part1({ values, setStep, isShowPlaceholder }) {
  const {
    contextValue: { numbers },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

  const {
    contextValue: { user },
  } = useContext(UserContext);
  let initialValues = {
    a1: '',
    a2: '',
  };

  if (values) {
    const { q1, _q2 } = values;
    initialValues['a1'] = q1 ? new Date(q1?.seconds * 1000) : '';
  }
  initialValues['a2'] = user?.company?.industryCode;
  return (
    <>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const { submitBtn, ...rest } = values;
              let countWasAnswered = 0;
              const oldAnsQ1 = numbers?.page1?.q1;
              const oldAnsQ2 = numbers?.page1?.q2;
              const wasAnsweredQ1 = oldAnsQ1
                ? String(oldAnsQ1).trim() != ''
                : false;
              const wasAnsweredQ2 = oldAnsQ2
                ? String(oldAnsQ2).trim() != ''
                : false;
              if (wasAnsweredQ1) countWasAnswered++;
              if (wasAnsweredQ2) countWasAnswered++;

              if (submitBtn == 'Continue') {
                const answers = rest;
                const { a1: q1, a2: q2 } = answers;
                const contextAnswers = rest;

                if (q1) {
                  const date = new Date(q1);
                  const seconds = Math.floor(date.getTime() / 1000);
                  contextAnswers.a1 = { seconds };
                }

                let countIsAnswered = 0;
                const isAnsweredQ1 = String(q1).trim() != '';
                const isAnsweredQ2 = String(q2).trim() != '';
                if (isAnsweredQ1) countIsAnswered++;
                if (isAnsweredQ2) countIsAnswered++;

                let newProgress = +numbers.progress;
                let totalAnswered = +numbers.totalAnswered;

                newProgress +=
                  Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
                  (countIsAnswered - countWasAnswered);
                totalAnswered += countIsAnswered - countWasAnswered;
                if (newProgress > 100) newProgress = 100;
                let data = {
                  'section5.page1.q1': q1,
                  'section5.page1.q2': q2,
                  'section5.totalAnswered': totalAnswered,
                };
                if (newProgress >= 0) {
                  data = {
                    ...data,
                    'section5.progress': newProgress,
                  };
                }
                const { status } = await updateData(
                  'planSections',
                  numbers._id,
                  data
                );

                if (status) {
                  if (newProgress >= 0) setProgress('numbers', newProgress);
                  setTotalAnswered('numbers', totalAnswered);

                  updateSection('numbers', 'page1', {
                    q1: contextAnswers.a1,
                    q2,
                  });
                  setStep(2);
                } else {
                  alert('Something went wrong. Try again.');
                }
              } else {
                setStep(2);
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
                <Box w={'100%'}>
                  <Text>
                    1. What is the end date you are working to for the first
                    quarter e.g. 31 Mar YY?
                  </Text>

                  <InputGroup
                    w="240px"
                    h="50px"
                    my={'11px'}
                    p={'1'}
                    alignItems={'center'}
                    border={'1px solid #E4E5E7'}
                  >
                    <DatePickerField width="100%" name="a1" />

                    <InputRightElement
                      width="4.5rem"
                      display={'flex'}
                      alignItems="center"
                    >
                      <IconButton
                        variant="unstyled"
                        size="lg"
                        icon={<CalendarIcon />}
                        bgColor="transparent"
                      />
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <br />
                <Box width={'100%'}>
                  <Text>2. What industry are you in?</Text>
                  <InputGroup width={'240px'} height="50px" my={'11px'}>
                    <Field name="a2">
                      {({ field, form }) => (
                        <Input
                          borderRadius={0}
                          h="50px"
                          w="100%"
                          p="2"
                          readonly="readonly"
                          {...field}
                          id="a2"
                          type="text"
                          placeholder={
                            isShowPlaceholder
                              ? 'Fast moving goods distribution'
                              : ''
                          }
                        />
                      )}
                    </Field>
                  </InputGroup>
                </Box>
                <Flex my={'49px'} justifyContent="end">
                  <SkipStepButton isSubmitting={props.isSubmitting} />
                  <Box mx="5">
                    <ContinueStepButton isSubmitting={props.isSubmitting} />
                  </Box>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}
