import { Box, Flex } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import React, { useContext, lazy } from 'react';
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
export default function Part3({ values, setStep, isShowPlaceholder }) {
  const {
    contextValue: { numbers },
    setTotalAnswered,
    setProgress,
    updateSection,
  } = useContext(SectionsContext);

  const isShow = isShowPlaceholder;
  const placeholders = ['7', '6', '5', '4'];

  let initialValues = {
    a1: ['', '', '', ''],
  };

  if (values) {
    const { q6 } = values;
    initialValues = { a1: q6 };
  }
  return (
    <>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const steps = { Skip: 4, Previous: 2, Continue: 4 };

              const oldAns = numbers.page3?.q6;
              const wasAnswered = oldAns
                ? oldAns.findIndex((a) => String(a).trim() != '') > -1
                : false;
              const { submitBtn, ...rest } = values;
              if (submitBtn === 'Continue') {
                const answers = Object.values(rest);
                const [q6] = answers;
                const isAnswered =
                  q6.findIndex((a) => String(a).trim() != '') > -1;

                let newProgress = +numbers.progress;
                let totalAnswered = +numbers.totalAnswered;

                if (isAnswered && !wasAnswered) {
                  newProgress += Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered++;
                }
                if (!isAnswered && wasAnswered) {
                  newProgress -= Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered--;
                }
                let data = {
                  'section5.page3.q6': q6,
                  'section5.totalAnswered': totalAnswered,
                };
                if (newProgress > 100) newProgress = 100;
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
                  updateSection('numbers', 'page3', { q6 });
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
                  <TablePercentageSign
                    question={
                      '6. What percentage of sales do you intend to set aside for marketing?'
                    }
                    index={0}
                    rowTitle={'Marketing Spent % of Sale'}
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
