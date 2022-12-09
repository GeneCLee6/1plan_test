import {
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Spacer,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import React, { useContext, lazy, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { TablePercentageSign } from '../TableContainer';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../../config';

const ContinueStepButton = lazy(() =>
  import('components/ui/start-plan/ContinueStepButton')
);
const SkipStepButton = lazy(() =>
  import('components/ui/start-plan/SkipStepButton')
);
const PreviousStepButton = lazy(() =>
  import('components/ui/start-plan/PreviousStepButton')
);
export default function Part4({ values, setStep, isShowPlaceholder }) {
  const {
    contextValue: { numbers },
    setTotalAnswered,
    setProgress,
    updateSection,
  } = useContext(SectionsContext);
  const isShow = isShowPlaceholder;
  const placeholders = ['70', '70', '65', '65'];

  let initialValues = {
    a1: '',
    a2: ['', '', '', ''],
    a3: ['', '', '', ''],
  };

  if (values) {
    const { q8, q9, q7 } = values;
    initialValues = { a1: q7 === 'Resell', a2: q8, a3: q9 };
  }
  const [switchState, setSwtichState] = useState(initialValues.a1);

  return (
    <>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const steps = { Skip: 5, Previous: 3, Continue: 5 };
              const oldAnsQ7 = numbers.page4?.q7;
              const oldAnsQ8 = numbers.page4?.q8;
              const oldAnsQ9 = numbers.page4?.q9;
              const wasAnsweredQ7 = oldAnsQ7 ? oldAnsQ7.trim() != '' : false;
              const wasAnsweredQ8 = oldAnsQ8
                ? oldAnsQ8.findIndex((a) => String(a).trim() != '') > -1
                : false;
              const wasAnsweredQ9 = oldAnsQ9
                ? oldAnsQ9.findIndex((a) => String(a).trim() != '') > -1
                : false;
              let countWasAnswered = 0;
              if (wasAnsweredQ7) countWasAnswered++;
              if (wasAnsweredQ8) countWasAnswered++;
              if (wasAnsweredQ9) countWasAnswered++;

              const { submitBtn, ...rest } = values;
              if (submitBtn === 'Continue') {
                const answers = Object.values(rest);
                const q7 = switchState ? 'Resell' : 'Sell';
                const q8 = answers[1];
                const q9 = answers[2];

                const isAnsweredQ7 = q7.trim() != '';
                const isAnsweredQ8 =
                  q8.findIndex((a) => String(a).trim() != '') > -1;
                const isAnsweredQ9 =
                  q9.findIndex((a) => String(a).trim() != '') > -1;
                let countIsAnswered = 0;
                if (isAnsweredQ7) countIsAnswered++;
                if (isAnsweredQ8) countIsAnswered++;
                if (isAnsweredQ9) countIsAnswered++;

                let newProgress = +numbers.progress;
                let totalAnswered = +numbers.totalAnswered;
                newProgress +=
                  Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
                  (countIsAnswered - countWasAnswered);
                totalAnswered += countIsAnswered - countWasAnswered;
                if (newProgress > 100) newProgress = 100;
                let data = {
                  'section5.page4.q7': q7,
                  'section5.page4.q8': q8,
                  'section5.page4.q9': q9,
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
                  updateSection('numbers', 'page4', { q7, q8, q9 });
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
                <Box w={'100%'}>
                  <Text>7. Do you sell/resell products?</Text>

                  <Flex mt={'5'}>
                    <Box></Box>
                    <Spacer />
                    <Text fontSize={'18px'} width="98px" textAlign={'center'}>
                      Sell
                    </Text>
                    <Switch
                      id="a1"
                      size={'lg'}
                      name={`a1`}
                      defaultChecked={switchState}
                      onChange={(e) => {
                        setSwtichState(e.target.checked);
                      }}
                    />
                    <Text fontSize={'18px'} width="98px" textAlign={'center'}>
                      Resell
                    </Text>
                    <Spacer />
                    <Box></Box>
                  </Flex>
                </Box>
                <br />
                <Box width={'100%'}>
                  <TablePercentageSign
                    index={1}
                    question={
                      '8. What will be the percentage of your Cost of Sales/Labour? In other words, the cost to you DIVIDED by the Sale Price MULTIPLIED by 100%.'
                    }
                    rowTitle={'Cast of Sales/Labour %'}
                    isShow={isShow}
                    placeholders={placeholders}
                  />
                </Box>
                <Box width={'100%'}>
                  <TablePercentageSign
                    index={2}
                    question={
                      '9. What will be the percentage of your Cost of Labour or other Direct Costs? In other words, the Cost of Labour or other Direct Cost DIVIDED by the Sale Price MULTIPLIED by 100%.'
                    }
                    rowTitle={'Cost Labour / Other Direct Cost as a % Of sales'}
                    isShow={isShow}
                    placeholders={placeholders}
                  />
                </Box>
                <Flex my={'5'} justifyContent="end">
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
