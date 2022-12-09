import React, { useState, useContext, lazy } from 'react';
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
	InputGroup,
	IconButton,
	InputRightElement,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Part2Title, TOTAL_QUESTIONS } from '../../configs';
import { priceFormatter } from 'utils/money';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { isSectionAnswered } from 'utils/common';
import { DatePickerField } from 'components/ui/DatePicker';

const ContinueStepButton = lazy(() =>
	import('components/ui/start-plan/ContinueStepButton')
);
const PreviousStepButton = lazy(() =>
	import('components/ui/start-plan/PreviousStepButton')
);
const SkipStepButton = lazy(() =>
	import('components/ui/start-plan/SkipStepButton')
);

export default function Part2Q5({ values, setStep, isShowPlaceholder }) {
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
		['Queensland rep', 1000, '11/03/2022'],
		['Setup error tracking system', 0, '11/03/2022'],
		['Setup appointments with potential suppliers', 5000, '11/03/2022'],
		['Layout territory list for new rep', 2000, '11/03/2022'],
		['Set Queensland budget for 2022', 0, '11/03/2022'],
	];
	if (values) {
		initialValues = JSON.parse(JSON.stringify(values));
		for (let prop in initialValues) {
			const date = initialValues[prop][2];
			if (date) initialValues[prop][2] = new Date(date.seconds * 1000);
		}
	}
	return (
		<>
			<Heading px="5" py="7" fontSize={'15'} bg="#F7F9FA">
				{Part2Title}
			</Heading>
			<Box p="4" bg="white">
				<Box>
					<Text>5. Who do you need to help you?</Text>
					<Text>
						You may know who you are going to use or you may need to research to
						find someone e.g. an VA, Accountant, Solicitor, Web Designer, etc.
					</Text>
				</Box>

				<Box pl="6" pr="10">
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const { submitBtn, ...rest } = values;
							const steps = {
								Skip: 2.5,
								Previous: 2.3,
								Continue: 2.5,
							};
							const oldAns = quickStart?.part2?.q5?.answers;
							const wasAnswered = isSectionAnswered({ objArr: oldAns });
							if (submitBtn === 'Continue') {
								const answers = JSON.parse(JSON.stringify(rest));
								const contextAnswers = JSON.parse(JSON.stringify(rest));
								for (const key in answers) {
									const [_a, _b, dateStr] = answers[key];
									if (dateStr) {
										const date = new Date(dateStr);
										const seconds = Math.floor(date.getTime() / 1000);
										contextAnswers[key][2] = { seconds };
										answers[key][2] = date;
									}
								}
								const q5 = {
									...quickStart.part2?.q5,
									answers: contextAnswers,
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
									'section1.part2.q5.answers': answers,
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
									updateSection('quickStart', 'part2', { q5 });
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
									<TableContainer mt="5" h="550px">
										<Table variant="unstyled">
											<Thead>
												<Tr>
													<Th></Th>
													<Th textTransform={'none'}>People I need</Th>
													<Th textTransform={'none'}>
														Wages or fees next 90 days?
													</Th>
													<Th textTransform={'none'}>
														When will they come on board?
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
																key={i}
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
																			<Flex justifyContent={'center'}>
																				<Box
																					display={'flex'}
																					alignItems="center"
																					justifyContent="center"
																					w="150px"
																					border="1px solid #E4E5E7"
																					h="50px"
																				>
																					<Flex
																						bg="#F3F2F2"
																						px="1"
																						left="0"
																						top="0"
																						h="100%"
																						alignItems={'center'}
																					>
																						<Text>$</Text>
																					</Flex>
																					<Field name={`a${i + 1}.1`}>
																						{({ field, form }) => (
																							<Input
																								textAlign={'center'}
																								border="0"
																								borderRadius="0"
																								h="50px"
																								p="1"
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
																				</Box>
																			</Flex>
																		</Td>

																		<Td>
																			<Box border="1px solid #E4E5E7">
																				<InputGroup
																					size="md"
																					h="50px"
																					border="transparent"
																				>
																					<DatePickerField
																						width="100%"
																						name={`a${i + 1}.2`}
																					/>
																					<InputRightElement
																						width="4.5rem"
																						display={'flex'}
																						alignItems="center"
																					>
																						<IconButton
																							variant="unstyled"
																							size="lg"
																							icon={<CalendarIcon />}
																							bgColor="transparent"
																						/>
																					</InputRightElement>
																				</InputGroup>
																			</Box>
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
