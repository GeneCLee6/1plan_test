import React, { lazy, useContext } from 'react';
import { Box, Text, Heading, Input, Textarea } from '@chakra-ui/react';
import {
  PART4_TITLE,
  FIRST_STEP,
  LAST_STEP,
  TOTAL_QUESTIONS,
} from '../configs';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { isSectionAnswered } from 'utils/common';
const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page13({ values, setStep, isShowPlaceholder }) {
  const {
    contextValue: { visionOfSuccess },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

  let initialValues = { q9: '' };

  if (values) {
    let q9 = values[0];
    initialValues = { q9 };
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
              const wasAnswered = part4?.q9
                ? part4.q9.answers[0] !== ''
                : false;
              if (submitBtn === 'Continue') {
                const answers = Object.values(rest);

                const q9 = {
                  ...visionOfSuccess.part4?.q9,
                  answers,
                };

                const isAnswered = answers[0].trim() !== '';
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
                let data = {
                  'section4.part4.q9.answers': answers,
                  'section4.totalAnswered': totalAnswered,
                };
                console.log(
                  'P13 Q9: progress',
                  newProgress,
                  'totalAnswered:',
                  totalAnswered
                );
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
                  updateSection('visionOfSuccess', 'part4', { q9 });
                  setStep(4.14);
                } else {
                  alert('Something went wrong. Try again.');
                }
              }
              if (submitBtn === 'Skip') setStep(4.14);
              if (submitBtn === 'Previous') setStep(4.12);
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
                  9. Of all your LONG-TERM goals on the left side of the screen,
                  which one if achieved, would mean the others would become
                  redundant?
                </Text>
                <br />
                <Field name={'q9'}>
                  {({ field, form }) => (
                    <Textarea
                      borderRadius={0}
                      h="50px"
                      w="100%"
                      p="1"
                      {...field}
                      id="q9"
                      placeholder={
                        isShowPlaceholder
                          ? 'Developing our own successful home brand product'
                          : ''
                      }
                      type="text"
                    />
                  )}
                </Field>
                <br />
                <StepButtonGroup
                  currentStep={4.13}
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
