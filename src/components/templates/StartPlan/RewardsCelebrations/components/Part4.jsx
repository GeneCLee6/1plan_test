import React, { lazy } from 'react';
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
import { Field, Formik, Form, FieldArray } from 'formik';
import KPIForm from '../KPIForm';
import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../configs';

const ButtonGroup = lazy(() => import('./../ButtonGroup'));
export default function Part4({ values, setPage, isShowPlaceholder }) {
  const {
    contextValue: { rewardsCelebrations },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

  const initVal = {
    q4: '',
    q5: {
      a1: [
        '',
        { value: 0, unit: '%' },
        { value: 0, unit: '%' },
        { value: 0, unit: '%' },
        { value: 0, unit: '%' },
      ],
      a2: [
        '',
        { value: 0, unit: '($)' },
        { value: 0, unit: '($)' },
        { value: 0, unit: '($)' },
        { value: 0, unit: '($)' },
      ],
    },
  };

  const isShow = isShowPlaceholder;
  const placeholder1 =
    "Cull 5 slow moving Products & Source 3 'Hot Selling' products";
  const placeholders = [
    'Cull slow-moving products and replace with fast moving',
    'Increase average order per client',
  ];

  if (values) {
    const { q4, q5 } = values;
    initVal.q4 = q4.answers[0];
    initVal.q5 = q5.answers;
    initVal.q5.a1 = q5.answers.a1;
    initVal.q5.a2 = q5.answers.a2;
  }

  return (
    <>
      <Box bg={'white'} p="4">
        <Formik
          enableReinitialize
          initialValues={initVal}
          onSubmit={async (values, actions) => {
            const oldAnsQ4 = rewardsCelebrations?.part3?.q4?.answers;
            const oldAnsQ5 = rewardsCelebrations?.part3?.q5?.answers;

            let countWasAnswered = 0;
            const wasAnsweredA4 = oldAnsQ4 ? oldAnsQ4[0].trim() : false;
            const wasAnsweredA5 = oldAnsQ5
              ? Object.values(oldAnsQ5).findIndex((a) => a[0].trim() !== '') >
                -1
              : false;
            if (wasAnsweredA4) countWasAnswered++;
            if (wasAnsweredA5) countWasAnswered++;

            if (values.submitBtn == 'Continue') {
              const { submitBtn, ...rest } = values;
              const answers = rest.q5;

              const answer = [rest.q4];
              const q4 = {
                ...rewardsCelebrations.part3?.q4,
                answers: answer,
              };
              const q5 = {
                ...rewardsCelebrations.part3?.q5,
                answers,
              };
              const isAnsweredA4 = answer[0].trim() != '';
              const isAnsweredA5 =
                Object.values(answers).findIndex((a) => a[0].trim() !== '') >
                -1;
              let countIsAnswered = 0;
              if (isAnsweredA4) countIsAnswered++;
              if (isAnsweredA5) countIsAnswered++;
              let newProgress = rewardsCelebrations.progress;
              let totalAnswered = rewardsCelebrations.totalAnswered;

              newProgress =
                +rewardsCelebrations.progress +
                Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
                  (countIsAnswered - countWasAnswered);

              totalAnswered += countIsAnswered - countWasAnswered;
              if (newProgress > 100) newProgress = 100;
              let data = {
                'section2.part3.q5.answers': answers,
                'section2.part3.q4.answers': answer,
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
                updateSection('rewardsCelebrations', 'part3', { q4, q5 });
                setPage(5);
              } else {
                alert('Something went wrong. Try again.');
              }
            }
            if (values.submitBtn == 'Skip') {
              setPage(5);
            }
            if (values.submitBtn == 'Previous') {
              setPage(3);
            }
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
              <Heading as="h3" size={'sm'} paddingBottom="5">
                4. Of all your PERSONAL priorities, what do you want to achieve
                most in the next 90 days?
              </Heading>
              <Box mb={10}>
                <Field name="q4">
                  {({ field, form, meta }) => (
                    <Input
                      borderRadius={0}
                      id="q4"
                      h="50px"
                      p="2"
                      {...field}
                      placeholder={isShowPlaceholder ? placeholder1 : ''}
                    />
                  )}
                </Field>
              </Box>
              <br />
              <Heading as="h3" size={'sm'} paddingBottom="5">
                5. Now think about how to measure this. What is the best result
                you think deserves a reward remembering, anything greater than
                80% should be rewarded.
              </Heading>

              <KPIForm
                values={props.values.q5}
                pageNo={4}
                isShow={isShow}
                placeholders={placeholders}
              />
              <ButtonGroup page={4} status={props} />
            </Form>
          )}
        </Formik>
        {/* <KPIForm initValues={initVal} pageNo={4} setPage={setPage} /> */}
      </Box>
    </>
  );
}
