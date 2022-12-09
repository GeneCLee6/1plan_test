import React from 'react';
import { Flex, Heading, Box, Text } from '@chakra-ui/react';
import { TwoRowsTable } from '../TwoRowsTable';
import { Formik, Form } from 'formik';
import { lazy, useContext } from 'react';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { isSectionAnswered } from 'utils/common';
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

export default function Q2({ setStep, values, isShowPlaceholder }) {
  const {
    contextValue: { strengthsOpportunities },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

  const isShow = isShowPlaceholder;
  const placeholder1 = [
    'Excellent name in the industry',
    'Become industry advocates for our customers',
    'We are the go-to distributor for new brands',
    'Continually upgrade to the fastest moving products',
  ];
  const placeholder2 = [
    'Low representation in Northern Australia',
    'Establish an office in Queensland',
    'We are the go-to distributor for new brands',
    'Continually upgrade to the fastest moving products',
  ];

  let initialValues = {
    a1: ['', ''],
    a2: ['', ''],
    a3: ['', ''],
    a4: ['', ''],
  };

  if (values) {
    const { aOp1, aOp2, aTh1, aTh2 } = values;
    initialValues = { a1: aOp1, a2: aOp2, a3: aTh1, a4: aTh2 };
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
        Part 2 – OPPORTUNITIES AND THREATS
      </Heading>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text fontSize={'16px'} fontWeight={'bold'} mb={'5'}>
            2. Please complete the following table:
          </Text>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const oldAns = strengthsOpportunities.part2?.q2?.answers;
              const wasAnswered = isSectionAnswered({ objArr: oldAns });

              const { submitBtn, ...rest } = values;
              const steps = {
                Skip: 3.1,
                Previous: 2.1,
                Continue: 3.1,
              };
              if (submitBtn === 'Continue') {
                const { a1: aOp1, a2: aOp2, a3: aTh1, a4: aTh2 } = rest;
                const answers = { aOp1, aOp2, aTh1, aTh2 };
                const q2 = {
                  ...strengthsOpportunities?.part2?.q2,
                  answers,
                };
                const isAnswered = isSectionAnswered({ objArr: answers });
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
                  'section3.part2.q2.answers': answers,
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
                  updateSection('strengthsOpportunities', 'part2', { q2 });
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
                  <TwoRowsTable
                    colunm1={'Oppotunities'}
                    column2={'How Can I Capitalize this?'}
                    index1={0}
                    index2={1}
                    isShow={isShow}
                    placeholders={placeholder1}
                  />
                  <TwoRowsTable
                    colunm1={'Threats'}
                    column2={'How Can I Mitigate this?'}
                    index1={2}
                    index2={3}
                    isShow={isShow}
                    placeholders={placeholder2}
                  />
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
