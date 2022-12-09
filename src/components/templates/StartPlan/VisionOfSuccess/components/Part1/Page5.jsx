import React, { lazy, useContext } from 'react';
import { Box, Text, Heading, Input, Flex } from '@chakra-ui/react';
import {
	PART1_TITLE,
	FIRST_STEP,
	LAST_STEP,
	TOTAL_QUESTIONS,
} from '../configs';
import { Formik, Form, Field, FieldArray } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';

const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page5({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const placeholders = [
		'Always trading with honesty, trust and integrity',
		'100% pure organic food i.e no nastys and a real food with an economic outlook',
		'Being the experts and trusted advisers in health and wellness',
		'Easy to deal with. Professional but casual',
		'Always focusing on continuous improvement',
		'',
	];

	let initialValues = ['', '', '', '', '', ''];

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
				{PART1_TITLE}
			</Heading>
			<Box p={'4'} bg="white" border={'1px solid #E4E5	E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const { submitBtn, ...rest } = values;
							const { part1 } = visionOfSuccess;

							const wasAnswered = part1.q5
								? part1.q5.answers.findIndex((a) => a.trim() !== '') > -1
								: false;

							if (submitBtn === 'Continue') {
								const answers = Object.values(rest);
								const q5 = {
									...visionOfSuccess.part1?.q5,
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
									'P5 Q5: progress',
									newProgress,
									'totalAnswered:',
									totalAnswered
								);
								if (newProgress > 100) newProgress = 100;
								let data = {
									'section4.part1.q5.answers': answers,
									'section4.totalAnswered': totalAnswered,
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
									updateSection('visionOfSuccess', 'part1', { q5 });
									setStep(2.6);
								} else {
									alert('Something went wrong. Try again.');
								}
							}
							if (submitBtn === 'Skip') {
								setStep(2.6);
							}
							if (submitBtn === 'Previous') {
								setStep(1.4);
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
								<Text>
									5. CORE VALUES (Always):These are the things that never
									change. They will be with you for the life of the business.
									For example, McDonald's values are Responsible Leadership,
									Inclusiveness, Progressiveness and Local Integration.
								</Text>
								<br />
								<br />
								<Flex>
									<Text mr="5px">
										Our Values-Not negotiable and never Change
									</Text>
									<Text color="red">(Max 30 word description)</Text>
								</Flex>
								{props.values.map((v, i) => (
									<FieldArray
										key={i}
										name={i}
										render={(arrayHelpers) => (
											<Flex alignItems={'center'} my="15px" w="100%">
												<Text mr="20px">{i + 1}</Text>
												<Field name={i}>
													{({ field, form }) => (
														<Input
															borderRadius={0}
															h="50px"
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
									currentStep={1.5}
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
