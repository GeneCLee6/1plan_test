import React, { useEffect, useState, useContext, lazy } from 'react';
import {
  Box,
  Heading,
  Input,
  Text,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Part2Title, TOTAL_QUESTIONS } from '../../configs';
import { isSectionAnswered } from 'utils/common';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { intro2 } from '../../configs';
const ContinueStepButton = lazy(() =>
  import('components/ui/start-plan/ContinueStepButton')
);
const PreviousStepButton = lazy(() =>
  import('components/ui/start-plan/PreviousStepButton')
);
const SkipStepButton = lazy(() =>
  import('components/ui/start-plan/SkipStepButton')
);

export default function Part2Q2({
  values,
  setStep,
  setIntros,
  isShowPlaceholder,
}) {
  const {
    contextValue: { quickStart },
    setProgress,
    setTotalAnswered,
    updateSection,
  } = useContext(SectionsContext);
  let initialValues = {
    a1: ['', 0, ''],
    a2: ['', 0, ''],
    a3: ['', 0, ''],
    a4: ['', 0, ''],
    a5: ['', 0, ''],
  };
  const placeholders = [
    [
      'Sales & Marketing',
      '70',
      'Expand market into Southen Highlands with a delicated rep',
    ],
    [
      'Customer Service & Support',
      '60',
      'Introduce a "head of department" in organisation structure',
    ],
    [
      'Administration',
      '90',
      'Add the automation to the accounts receivable process',
    ],
    ['Distribution', '100', 'GOLD STAR'],
    ['Business Development & Management', '80', 'Bring on a logistics manager'],
  ];
  if (values) {
    const { a1, a2, a3, a4, a5 } = values;
    initialValues = { a1, a2, a3, a4, a5 };
  }
  useEffect(() => {
    const { part1 } = quickStart;
    if (part1) {
      const noEmptyStrings = [];
      for (const item of part1?.q1?.answers) {
        if (item !== '' && item !== ' ') {
          noEmptyStrings.push(item);
        }
      }

      const priorities = noEmptyStrings;
      setIntros((intros) => ({
        isCard1ListFormat: true,
        overview: priorities,
        title: 'Quartly Priorities',
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Heading px="5" py="7" fontSize={'15'} bg="#F7F9FA">
        {Part2Title}
      </Heading>
      <Box p="4" bg="white">
        <Text>
          2 Making sure we have the right people in the right seats on the bus.
        </Text>

        <Box pl="6" pr="10">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={async (values, actions) => {
              const { submitBtn, ...rest } = values;
              const steps = {
                Skip: 2.2,
                Previous: 1,
                Continue: 2.2,
              };
              const oldAns = quickStart?.part2?.q2?.answers;
              const wasAnswered = isSectionAnswered({ objArr: oldAns });
              if (submitBtn === 'Continue') {
                const answers = { ...rest };
                const q2 = {
                  ...quickStart.part2?.q2,
                  answers,
                };
                const isAnswered = isSectionAnswered({ objArr: answers });
                let newProgress = quickStart.progress;
                let totalAnswered = quickStart.totalAnswered;
                if (isAnswered && !wasAnswered) {
                  newProgress =
                    +quickStart.progress +
                    Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered++;
                }
                if (!isAnswered && wasAnswered) {
                  newProgress =
                    +quickStart.progress -
                    Math.ceil((1 / TOTAL_QUESTIONS) * 100);
                  totalAnswered--;
                }
                if (newProgress > 100) newProgress = 100;
                let data = {
                  'section1.part2.q2.answers': answers,
                  'section1.totalAnswered': totalAnswered,
                };
                if (newProgress >= 0) {
                  data = {
                    ...data,
                    'section1.progress': newProgress,
                  };
                }
                const { status } = await updateData(
                  'planSections',
                  quickStart._id,
                  data
                );
                if (status) {
                  if (newProgress >= 0) setProgress('quickStart', newProgress);
                  setTotalAnswered('quickStart', totalAnswered);
                  updateSection('quickStart', 'part2', { q2 });
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
                <Box w="100%">
                  <TableContainer mt="5">
                    <Table variant="unstyled">
                      <Thead>
                        <Tr>
                          <Th></Th>
                          <Th textTransform={'none'} textAlign="center">
                            Department
                          </Th>
                          <Th textTransform={'none'} textAlign="center">
                            Rank %
                          </Th>
                          <Th textTransform={'none'} textAlign="center">
                            Improvement Ideas
                          </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.values(props.values).map((v, i) => (
                          <React.Fragment key={i}>
                            {!Object.keys(props.values)[i].startsWith(
                              'submitBtn'
                            ) && (
                              <FieldArray
                                name={`a${i + 1}`}
                                render={(arrayHelpers) => (
                                  <Tr key={i}>
                                    <Td>{i + 1}. </Td>
                                    <Td>
                                      <Field name={`a${i + 1}.0`}>
                                        {({ field, form }) => (
                                          <Input
                                            borderRadius={0}
                                            h="50px"
                                            w="350px"
                                            p="1"
                                            {...field}
                                            id={`a${i + 1}.0`}
                                            type="text"
                                            placeholder={
                                              isShowPlaceholder
                                                ? placeholders[i][0]
                                                : ''
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Td>
                                    <Td>
                                      <Box
                                        display={'flex'}
                                        alignItems="center"
                                        justifyContent="center"
                                        w="60px"
                                        position="relative"
                                        h="50px"
                                      >
                                        <Field name={`a${i + 1}.1`}>
                                          {({ field, form }) => (
                                            <Input
                                              textAlign={'center'}
                                              borderRadius="0"
                                              h="50px"
                                              p="3"
                                              maxLength="100"
                                              {...field}
                                              id={`a${i + 1}.1`}
                                              type="number"
                                              placeholder={
                                                isShowPlaceholder
                                                  ? placeholders[i][1]
                                                  : ''
                                              }
                                            />
                                          )}
                                        </Field>

                                        <Flex
                                          bg="#F3F2F2"
                                          position="absolute"
                                          right="0"
                                          top="0"
                                          h="100%"
                                          alignItems={'center'}
                                        >
                                          <Text>%</Text>
                                        </Flex>
                                      </Box>
                                    </Td>
                                    <Td>
                                      <Field name={`a${i + 1}.2`}>
                                        {({ field, form }) => (
                                          <Input
                                            borderRadius="0"
                                            h="50px"
                                            w="300px"
                                            p="1"
                                            {...field}
                                            id={`a${i + 1}.2`}
                                            type="text"
                                            placeholder={
                                              isShowPlaceholder
                                                ? placeholders[i][2]
                                                : ''
                                            }
                                          />
                                        )}
                                      </Field>
                                    </Td>
                                  </Tr>
                                )}
                              />
                            )}
                          </React.Fragment>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
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
