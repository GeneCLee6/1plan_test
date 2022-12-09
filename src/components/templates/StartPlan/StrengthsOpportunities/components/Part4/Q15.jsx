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

export default function Q15({ setStep, values, isShowPlaceholder }) {
  const {
    contextValue: { strengthsOpportunities },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);

  const placeholder = `The Team: CEO of competitors businees on board
  The pain point: Avoiding processed foods
  How you fix this: Easy access to organic alternatives`;

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
            15. What are the key points of my Pitch Deck?
          </Text>

          <Text pt={'3'}>
            A pitch deck covers of the 10 to 12 critical components of your
            business proposal. Whilst this would be presented in a separate
            presentation, write down the key indicators for your business
            demonstrating why it would be successful.The good news is, you have
            already done most of the work up to this stage of the business plan.
            The common themes are:
          </Text>

          <UnorderedList pt={'3'}>
            <ListItem>The Team</ListItem>
            <ListItem pt={'2'}>
              The problem, pain point or gaping wound
            </ListItem>
            <ListItem pt={'2'}>How you fix this</ListItem>
            <ListItem pt={'2'}>
              Why is what you are offering special or unique
            </ListItem>
            <ListItem pt={'2'}>Customer experience or traction so far</ListItem>
            <ListItem pt={'2'}>Market size</ListItem>
            <ListItem pt={'2'}>Who are your competitors?</ListItem>
            <ListItem pt={'2'}>Monetization model</ListItem>
            <ListItem pt={'2'}>
              Finance, Funding, cash-flow, budgets, valuations, cash injection
              required
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
                const oldAns = strengthsOpportunities.part4?.q15?.answers;
                const wasAnswered = oldAns ? oldAns[0].trim() != '' : false;
                const { submitBtn, ...rest } = values;
                const steps = {
                  Previous: 4.3,
                  Continue: 4.5,
                  Skip: 4.5,
                };
                if (submitBtn === 'Continue') {
                  const answers = Object.values(rest);
                  const isAnswered = answers[0].trim() != '';
                  const q15 = {
                    ...strengthsOpportunities?.part4?.q15,
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
                    'section3.part4.q15.answers': answers,
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
                    updateSection('strengthsOpportunities', 'part4', { q15 });
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
