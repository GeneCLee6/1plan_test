import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import React, { lazy, useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import FourSelectionTable from '../FourSelectionTable';
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

export default function Q11({ setStep, values, isShowPlaceholder }) {
  const {
    contextValue: { strengthsOpportunities },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);
  const isShow = isShowPlaceholder;
  const placeholders = [
    '67%',
    '100 hours saved per annum',
    '3 hours saved per week',
    '3 days',
    'Less than 1%',
    '3 days per annum',
    '40 hours per annum',
  ];
  const options = [
    'Gross Profit Margin or Billable hours',
    'Automation of processes',
    'Investment in Equipment or processes',
    'Order or delivery tracking',
    'Errors every 100 orders',
    'Staff Training',
    'Professional Development',
  ];
  let initialValues = {
    a1: [options[0], '', ''],
    a2: [options[0], '', ''],
    a3: [options[0], '', ''],
    a4: [options[0], '', ''],
  };

  if (values) {
    const { a1, a2, a3, a4 } = values;
    initialValues = { a1, a2, a3, a4 };
  }
  return (
    <>
      <Box bg="#F7F9FA" border={'1px solid #E4E5E7'} px={'5'} py="5">
        <Heading fontSize={'20px'} fontWeight={'700'}>
          Part 3 – DRIVERS AND KPIs
        </Heading>
        <Text fontSize={'14px'} py={1}>
          Fulfillment
        </Text>
      </Box>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text fontSize={'16px'} fontWeight={'bold'} mb={'5'}>
            11. Please select the 4 most important Fulfillment measurements for
            your business:
          </Text>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const oldAns = strengthsOpportunities.part3?.q11?.answers;
              let wasAnswered = false;
              if (oldAns) {
                wasAnswered =
                  Object.values(oldAns).findIndex(([a1, a2, a3]) => {
                    let countNotEmpty = 0;
                    if (a1.trim() != '') countNotEmpty++;
                    if (a2.trim() != '') countNotEmpty++;
                    if (a1 == 'Other - write your own' && a3.trim() != '') {
                      countNotEmpty++;
                      return countNotEmpty === 3;
                    }
                    if (a1 == 'Other - write your own' && a3.trim() == '')
                      return false;
                    return countNotEmpty >= 2;
                  }) > -1;
              }
              const { submitBtn, ...rest } = values;
              const steps = {
                Skip: 3.12,
                Previous: 3.9,
                Continue: 3.12,
              };
              if (submitBtn === 'Continue') {
                const answers = { ...rest };
                const isAnswered =
                  Object.values(answers).findIndex(([a1, a2, a3]) => {
                    let countNotEmpty = 0;
                    if (a1.trim() != '') countNotEmpty++;
                    if (a2.trim() != '') countNotEmpty++;
                    if (a1 == 'Other - write your own' && a3.trim() != '') {
                      countNotEmpty++;
                      return countNotEmpty === 3;
                    }
                    if (a1 == 'Other - write your own' && a3.trim() == '')
                      return false;
                    return countNotEmpty >= 2;
                  }) > -1;
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
                const q11 = {
                  ...strengthsOpportunities?.part3?.q11,
                  answers,
                };
                let data = {
                  'section3.part3.q11.answers': answers,
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
                  updateSection('strengthsOpportunities', 'part3', { q11 });
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
                <FourSelectionTable
                  props={props}
                  options={options}
                  isShow={isShow}
                  placeholders={placeholders}
                  width={'50%'}
                />
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
