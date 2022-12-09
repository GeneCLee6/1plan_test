import {
  Box,
  Heading,
  Text,
  Flex,
  Input,
  ListItem,
  UnorderedList,
  Textarea,
} from '@chakra-ui/react';

import React, { lazy, useContext } from 'react';
import { Field, Form, Formik } from 'formik';
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

export default function Q14({ setStep, values, isShowPlaceholder }) {
  const {
    contextValue: { strengthsOpportunities },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);
  const placeholder =
    'We are the trend setters and disruptors of the natural foods market';

  let initialValues = {
    a1: '',
  };
  if (values) {
    const [a1] = values;
    initialValues = { a1 };
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
        Part 4 – ATTRACTING INVESTORS & VALUING YOUR BUSINESS
      </Heading>
      <Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
        <Box pl={'6'} pr={'10'}>
          <Text fontSize={'16px'} fontWeight={'bold'}>
            14. What is my Elevator Pitch?
          </Text>
          <Text pt={'3'}>
            An elevator pitch is a short description of an idea, product or
            company that explains the concept in such a way that any listener
            can understand it in a short period of time. It should include:
          </Text>

          <UnorderedList pt={'3'}>
            <ListItem>The problem you are solving</ListItem>
            <ListItem pt={'2'}>Have you solved it</ListItem>
            <ListItem pt={'2'}>The market you are targeting</ListItem>
            <ListItem pt={'2'}>
              Why this is superior to what is already on offer
            </ListItem>
            <ListItem pt={'2'}>Who is behind you</ListItem>
            <ListItem pt={'2'}>
              Uptake or tractions and milestones reached
            </ListItem>
          </UnorderedList>
          <Text pt={'3'}>
            Have a go and list the key points of your elevator speech.
          </Text>
          <br />

          <Box width={'100%'}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={async (values, actions) => {
                const oldAns = strengthsOpportunities.part4?.q14?.answers;
                const wasAnswered = oldAns ? oldAns[0].trim() != '' : false;
                const { submitBtn, ...rest } = values;
                const steps = {
                  Previous: 4.2,
                  Continue: 4.4,
                  Skip: 4.4,
                };
                if (submitBtn === 'Continue') {
                  const answers = Object.values(rest);
                  const isAnswered = answers[0].trim() != '';
                  const q14 = {
                    ...strengthsOpportunities?.part4?.q14,
                    answers,
                  };
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
                    'section3.part4.q14.answers': answers,
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
                    updateSection('strengthsOpportunities', 'part4', { q14 });
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
                  <Field name={`a1`} key={0}>
                    {({ field, form }) => (
                      <Flex>
                        <Text
                          display="flex"
                          alignItems={'center'}
                          w={'120px'}
                          pr={3}
                        >
                          (40 words)
                        </Text>
                        <Textarea
                          {...field}
                          id={`a1`}
                          variant="outline"
                          type="text"
                          h="60px"
                          placeholder={isShowPlaceholder ? placeholder : ''}
                          borderRadius={0}
                        />
                      </Flex>
                    )}
                  </Field>

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
      </Box>
    </>
  );
}
