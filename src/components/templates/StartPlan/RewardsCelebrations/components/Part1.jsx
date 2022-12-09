import React, { useState, useContext } from 'react';
import {
  Box,
  Input,
  Text,
  Flex,
  Button,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Field, Formik, Form } from 'formik';
import ButtonGroup from '../ButtonGroup';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../configs';
export default function Part1({ values, setPage, isShowPlaceholder }) {
  const {
    contextValue: { rewardsCelebrations },
    setProgress,
    setTotalAnswered,
    updateSection,
    setSection,
  } = useContext(SectionsContext);

  const initialVal = { answer: '' };
  if (values) {
    initialVal['answer'] = values[0];
  }

  return (
    <>
      <Box bg={'white'} p="4">
        <Text>
          Your goals need to be expressed in terms that are measurable i.e they
          need to be SMART
          <br />
          (Specific, Measurable, Achievable, Relevant and Time-bound):
        </Text>
        <br />
        <Heading as="h3" size={'sm'} paddingBottom="5">
          1. Of all your TEAM priorities, what do you want to achieve most in
          the next 90 days?
        </Heading>
        <Text>Enter your Quarterly Priorities in the table below</Text>
        <br />
        <Box>
          <Formik
            enableReinitialize
            initialValues={{ answer: initialVal.answer, submitBtn: '' }}
            onSubmit={async (values, actions) => {
              const oldAns = rewardsCelebrations?.part1?.q1?.answers[0];
              const wasAnswered = oldAns != undefined && oldAns.trim() != '';
              if (values.submitBtn == 'Continue') {
                const answers = [values.answer];
                const q1 = {
                  ...rewardsCelebrations.part1?.q1,
                  answers,
                };
                const isAnswered = values.answer.trim() != '';
                let newProgress = rewardsCelebrations.progress;
                let totalAnswered = rewardsCelebrations.totalAnswered;
                if (isAnswered && !wasAnswered) {
                  newProgress =
                    +newProgress + Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered++;
                }
                if (!isAnswered && wasAnswered) {
                  newProgress =
                    +newProgress - Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered--;
                }
                if (newProgress > 100) newProgress = 100;
                let data = {
                  'section2.part1.q1.answers': answers,
                  'section2.totalAnswered': totalAnswered,
                };
                if (newProgress >= 0) {
                  data = {
                    ...data,
                    'section2.progress': newProgress,
                  };
                }
                const { status } = await updateData(
                  'planSections',
                  rewardsCelebrations._id,
                  data
                );

                if (status) {
                  if (newProgress >= 0)
                    setProgress('rewardsCelebrations', newProgress);
                  setTotalAnswered('rewardsCelebrations', totalAnswered);
                  updateSection('rewardsCelebrations', 'part1', { q1 });

                  setPage(2);
                } else {
                  alert('Something went wrong. Try again.');
                }
              }
              if (values.submitBtn == 'Skip') {
                setPage(2);
              }
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form
                onSubmit={(e) => {
                  console.log(e.nativeEvent.submitter);
                  const btn = e.nativeEvent.submitter;
                  console.log(btn.value);
                  props.setFieldValue('submitBtn', btn.value);
                  return props.handleSubmit(e);
                }}
              >
                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                  <GridItem>
                    <Text
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent="center"
                      w="100%"
                      h="100%"
                    >
                      Your Answer
                    </Text>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <Field name="answer">
                      {({ field, form }) => (
                        <Flex>
                          <Input
                            {...field}
                            variant="outline"
                            type="text"
                            id="answer"
                            placeholder={
                              isShowPlaceholder ? 'Increase sales by 5%' : ''
                            }
                            h="60px"
                          />
                        </Flex>
                      )}
                    </Field>
                  </GridItem>
                </Grid>
                <ButtonGroup page={1} status={props} />
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}
