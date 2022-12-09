import React, { useEffect, useContext, lazy } from 'react';
import { Box, Heading, Input, Text, Flex, Button } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../configs';

const ContinueStepButton = lazy(() =>
  import('components/ui/start-plan/ContinueStepButton')
);
const SkipStepButton = lazy(() =>
  import('components/ui/start-plan/SkipStepButton')
);
export default function Part1({ values, setStep, isShowPlaceholder }) {
  const {
    contextValue: { quickStart },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);
  const initialValues = {
    priority1: '',
    priority2: '',
    priority3: '',
    priority4: '',
    priority5: '',
  };
  const placeholders = [
    'Find a sales representative for Queensland',
    "Cull 5 slow moving Products & Source 3 'Hot Selling' products",
    'Automate supplier invoices into accounting system',
    'Reduce the number of errors from pick and packing to delivery',
    'Sales promotion to increase sales by 5% for the quarter',
  ];
  if (values) {
    values.forEach((v, i) => {
      initialValues[`priority${i + 1}`] = v;
    });
  }

  return (
    <>
      <Heading px="5" py="7" fontSize={'15'} bg="#F7F9FA">
        Part 1 - GAP ANALYSIS - SETTING QUARTERLY PRIORITIES
      </Heading>
      <Box p="4" bg="white">
        <Text>1. Enter your Quarterly Priorities in the table below</Text>

        <Box pl="6" pr="10">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const { submitBtn, ...rest } = values;
              const answers = Object.values(rest);
              const wasAnswered =
                quickStart?.part1?.q1?.answers.findIndex(
                  (a) => a.trim() !== ''
                ) > -1;

              if (submitBtn === 'Continue') {
                const q1 = {
                  ...quickStart.part1?.q1,
                  answers,
                };
                const isAnswered =
                  answers.findIndex((a) => a.trim() !== '') > -1;
                let newProgress = quickStart.progress;
                let totalAnswered = quickStart.totalAnswered;

                if (isAnswered && !wasAnswered) {
                  newProgress =
                    +quickStart.progress +
                    Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered += 1;
                }
                if (!isAnswered && wasAnswered) {
                  newProgress =
                    +quickStart.progress -
                    Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered -= 1;
                }
                if (newProgress > 100) newProgress = 100;
                let data = {
                  'section1.part1.q1.answers': answers,
                  'section1.totalAnswered': totalAnswered,
                };
                if (newProgress >= 0) {
                  data = {
                    ...data,
                    'section1.progress': newProgress,
                  };
                }
                const { status } = await updateData(
                  'planSections',
                  quickStart._id,
                  data
                );

                if (status) {
                  if (newProgress >= 0) setProgress('quickStart', newProgress);
                  setTotalAnswered('quickStart', totalAnswered);
                  updateSection('quickStart', 'part1', { q1 });

                  setStep(2.1);
                } else {
                  alert('Something went wrong. Try again.');
                }
              }
              if (submitBtn === 'Skip') setStep(2.1);
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
                {Object.values(props.values).map((v, i) => {
                  return (
                    <React.Fragment key={i}>
                      {!Object.keys(props.values)[i].startsWith(
                        'submitBtn'
                      ) && (
                        <Field name={`priority${i + 1}`} key={i}>
                          {({ field, form }) => (
                            <Flex py="5">
                              <Text
                                display="flex"
                                alignItems={'center'}
                                w="100px"
                              >
                                Priority {i + 1}
                              </Text>
                              <Input
                                {...field}
                                placeholder={
                                  isShowPlaceholder ? placeholders[i] : ''
                                }
                                id={`priority${i + 1}`}
                                variant="outline"
                                type="text"
                                h="60px"
                              />
                            </Flex>
                          )}
                        </Field>
                      )}
                    </React.Fragment>
                  );
                })}
                <Flex my="5" justifyContent={'end'}>
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
