import React, { lazy, useContext } from 'react';
import { Box, Text, Heading, Input, Flex } from '@chakra-ui/react';
import {
	PART2_TITLE,
	FIRST_STEP,
	LAST_STEP,
	TOTAL_QUESTIONS,
} from '../configs';
import { Formik, Form, Field, FieldArray } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';

const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page7({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const placeholders = [
		'Known for trading with honesty, trust and integrity',
		'Being the trusted distributor for brands',
		'Expert customer service',
		'National footprint on reducing obesity in children',
		'',
		'',
	];
	const initialValues = ['', '', '', '', '', ''];

	if (values) {
		values.forEach((v, i) => {
			initialValues[i] = v;
		});
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
				{PART2_TITLE}
			</Heading>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const { submitBtn, ...rest } = values;
							const { part2 } = visionOfSuccess;
							const wasAnswered = part2?.q7
								? part2.q7.answers?.findIndex((a) => a.trim() !== '') > -1
								: false;
							if (submitBtn === 'Continue') {
								const answers = Object.values(rest);
								const q7 = {
									...visionOfSuccess.part2?.q7,
									answers,
								};

								const isAnswered =
									answers.findIndex((a) => a.trim() !== '') > -1;
								let newProgress = +visionOfSuccess.progress;
								let totalAnswered = +visionOfSuccess.totalAnswered;
								if (isAnswered && !wasAnswered) {
									newProgress += Math.ceil((1 / TOTAL_QUESTIONS) * 100);
									totalAnswered++;
								}
								if (!isAnswered && wasAnswered) {
									newProgress -= Math.ceil((1 / TOTAL_QUESTIONS) * 100);
									totalAnswered--;
								}
								console.log(
									'P7 Q7: progress',
									newProgress,
									'totalAnswered:',
									totalAnswered
								);
								if (newProgress > 100) newProgress = 100;
								let data = {
									'section4.part2.q7.answers': answers,
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
									updateSection('visionOfSuccess', 'part2', { q7 });
									setStep(2.8);
								} else {
									alert('Something went wrong. Try again.');
								}
							}
							if (['Continue', 'Skip'].includes(submitBtn)) setStep(3.8);
							if (submitBtn === 'Previous') setStep(2.6);

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
								<Text>
									7. What are your BRAND PROMISES? What will your business be
									renowned for?
								</Text>
								<Text>
									What will you communicate to the world as the core of your
									brand? For example, Apple's brand promise is two-sided. Their
									guarantee to create products based on a different worldview,
									and their promise to inspire their customers to do the same.
								</Text>
								<br />
								<br />
								{props.values.map((v, i) => (
									<FieldArray
										key={i}
										name={`a2.${i}`}
										render={(arrayHelpers) => (
											<Flex alignItems={'center'} my="15px">
												<Text mr="20px">{i + 1}</Text>
												<Field name={i}>
													{({ field, form }) => (
														<Input
															borderRadius={0}
															h="50px"
															w="100%"
															p="1"
															{...field}
															id={i}
															type="text"
															placeholder={
																isShowPlaceholder ? placeholders[i] : ''
															}
														/>
													)}
												</Field>
											</Flex>
										)}
									/>
								))}
								<br />
								<StepButtonGroup
									currentStep={1.7}
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
