import { Box, Heading, Text, Flex, Select } from '@chakra-ui/react';
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

export default function Q7({ setStep, values }) {
	const {
		contextValue: { strengthsOpportunities },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	let initialValues = {
		a1: '',
	};
	if (values) {
		const [a1] = values;
		initialValues = { a1 };
	}
	return (
		<>
			<Box bg="#F7F9FA" border={'1px solid #E4E5E7'} px={'5'} py="5">
				<Heading fontSize={'20px'} fontWeight={'700'}>
					Part 3 – DRIVERS AND KPIs
				</Heading>
				<Text fontSize={'14px'} py={1}>
					Product / Service Offering
				</Text>
			</Box>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Text fontSize={'16px'} fontWeight={'bold'} mb={'5'}>
						7. Marketing – Do you provide a service or sell a product?
					</Text>
					<Box w={'100%'}>
						<Formik
							enableReinitialize
							initialValues={initialValues}
							onSubmit={async (values, actions) => {
								const oldAns = strengthsOpportunities.part3?.q7?.answers;
								let wasAnswered = oldAns ? oldAns[0].trim() != '' : false;

								const { submitBtn, ...rest } = values;
								const steps = {
									Skip: 3.7,
									Previous: 3.5,
									Continue: 3.7,
								};
								if (submitBtn === 'Continue') {
									const answers = Object.values(rest);
									let isAnswered = answers ? answers[0].trim() != '' : false;

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
									const q7 = {
										...strengthsOpportunities?.part3?.q7,
										answers,
									};

									let data = {
										'section3.part3.q7.answers': answers,
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
										updateSection('strengthsOpportunities', 'part3', { q7 });
										setStep(steps[submitBtn]);
									} else {
										alert('Something went wrong. Try again.');
									}
									updateData('planSections', strengthsOpportunities._id, data);
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
									<Field name={'a1'} key={'a1'}>
										{({ field, form }) => {
											return (
												<Select
													{...field}
													id="a1"
													placeholder="Select one"
													borderRadius={'0'}
													width={'350px'}
													cursor={'pointer'}
												>
													{['Provide a service', 'Sell a product'].map(
														(o, i) => (
															<option value={o} key={i}>
																{o}
															</option>
														)
													)}
												</Select>
											);
										}}
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
