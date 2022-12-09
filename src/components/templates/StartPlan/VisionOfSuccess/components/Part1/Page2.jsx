import React, { lazy, useContext } from 'react';
import { Box, Text, Heading, Select } from '@chakra-ui/react';
import {
  PART1_TITLE,
  FIRST_STEP,
  LAST_STEP,
  TOTAL_QUESTIONS,
} from '../configs';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';

const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page2({ values, setStep }) {
  const {
    contextValue: { visionOfSuccess },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

  let initialValues = {
    q1: '',
  };

  if (values) {
    initialValues.q1 = values[0];
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
        {PART1_TITLE}
      </Heading>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const { submitBtn, ...rest } = values;
              const steps = {
                Skip: 1.3,
                Continue: 1.3,
                Previous: 1.1,
              };

              const oldAns = visionOfSuccess?.part1?.q1?.answers;

              if (submitBtn === 'Continue') {
                const answers = Object.values(rest);

                const q1 = {
                  ...visionOfSuccess.part1?.q1,
                  answers,
                };

                let newProgress = +visionOfSuccess.progress;
                let totalAnswered = +visionOfSuccess.totalAnswered;
                if (!oldAns) {
                  newProgress =
                    +visionOfSuccess.progress +
                    Math.ceil((1 / TOTAL_QUESTIONS) * 100);

                  totalAnswered++;
                  console.log(
                    'P2 Q1: progress',
                    newProgress,
                    'totalAnswered:',
                    totalAnswered
                  );
                }
                if (newProgress > 100) newProgress = 100;
                let data = {
                  'section4.part1.q1.answers': answers,
                  'section4.totalAnswered': totalAnswered,
                };

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
                  updateSection('visionOfSuccess', 'part1', { q1 });
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
                <Text>1. What is the time frame of your business plan?</Text>
                <br />
                <Field name={'q1'}>
                  {({ field, form }) => (
                    <Select id="q1" {...field} width="50%">
                      {[
                        '5 year',
                        '6 years',
                        '7 years',
                        '8 years',
                        '9 years',
                        '10 years',
                      ].map((y, i) => (
                        <option value={y} key={i}>
                          {y}
                        </option>
                      ))}
                    </Select>
                  )}
                </Field>
                <br />
                <StepButtonGroup
                  currentStep={1.2}
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
