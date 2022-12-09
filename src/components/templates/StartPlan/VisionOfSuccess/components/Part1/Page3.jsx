import React, { lazy, useContext } from 'react';
import { Box, Text, Heading, Input, Textarea } from '@chakra-ui/react';
import {
	PART1_TITLE,
	FIRST_STEP,
	LAST_STEP,
	TOTAL_QUESTIONS,
} from '../configs';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page3({ value1, value2, setStep, isShowPlaceholder }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const placeholders = [
		'Being involved in an environment and community that people enjoy working for and being apart while leaving a footprint in our drive to tackle childhood obesity',
		'Being the go to supplier that is robust, proactive and trend setting',
	];
	let initialValues = {
		q2: '',
		q3: '',
	};

	if (value1 || value2) {
		const q2 = value1;
		const q3 = value2;
		initialValues = { q2, q3 };
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
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const { submitBtn, ...rest } = values;
							const steps = {
								Skip: 1.4,
								Continue: 1.4,
								Previous: 1.2,
							};
							const { part1 } = visionOfSuccess;
							let countWasAnswered = 0;
							const oldAnsQ2 = part1?.q2?.answers;
							const oldAnsQ3 = part1?.q3?.answers;
							const wasAnsweredQ2 = oldAnsQ2 ? oldAnsQ2.trim() != '' : false;
							const wasAnsweredQ3 = oldAnsQ3 ? oldAnsQ3.trim() != '' : false;
							if (wasAnsweredQ2) countWasAnswered++;
							if (wasAnsweredQ3) countWasAnswered++;

							if (submitBtn === 'Continue') {
								const { q2: a2, q3: a3 } = rest;
								const q2 = {
									...visionOfSuccess.part1?.q2,
									answers: a2,
								};
								const q3 = {
									...visionOfSuccess.part1?.q3,
									answers: a3,
								};

								let countIsAnswered = 0;
								const isAnsweredQ2 = a2.trim() != '';
								const isAnsweredQ3 = a3.trim() != '';
								if (isAnsweredQ2) countIsAnswered++;
								if (isAnsweredQ3) countIsAnswered++;

								let newProgress = +visionOfSuccess.progress;
								let totalAnswered = +visionOfSuccess.totalAnswered;
								newProgress =
									newProgress +
									Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
										(countIsAnswered - countWasAnswered);
								totalAnswered += countIsAnswered - countWasAnswered;
								console.log(
									'P3 Q2 Q3: progress',
									newProgress,
									'totalAnswered:',
									totalAnswered
								);

								if (newProgress > 100) newProgress = 100;
								let data = {
									'section4.part1.q2.answers': a2,
									'section4.part1.q3.answers': a3,
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
									updateSection('visionOfSuccess', 'part1', { q2, q3 });
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
								<Field name={'q2'}>
									{({ field, form }) => (
										<>
											<Text>
												2. PURPOSE: Why do you to be in this business?
											</Text>
											<br />
											<Textarea
												{...field}
												id="q2"
												variant="outline"
												type="text"
												h="60px"
												placeholder={isShowPlaceholder ? placeholders[0] : ''}
											/>
										</>
									)}
								</Field>
								<br />
								<br />
								<br />
								<Field name={'q3'}>
									{({ field, form }) => (
										<>
											<Text>
												3. VISION (someday): What is it you are striving to
												achieve a good example was Microsoft's early vision of
												"A computer on every desk and in every home"
											</Text>
											<br />
											<Textarea
												{...field}
												id="q3"
												variant="outline"
												type="text"
												h="60px"
												placeholder={isShowPlaceholder ? placeholders[1] : ''}
											/>
										</>
									)}
								</Field>
								<br />
								<StepButtonGroup
									currentStep={1.3}
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
