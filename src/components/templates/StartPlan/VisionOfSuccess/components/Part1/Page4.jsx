import React, { lazy, useContext } from 'react';
import { Box, Text, Heading, Input, Flex, Textarea } from '@chakra-ui/react';
import {
	PART1_TITLE,
	FIRST_STEP,
	LAST_STEP,
	TOTAL_QUESTIONS,
} from '../configs';
import { Formik, Form, Field, FieldArray } from 'formik';
import { updateData } from 'services/firestore';
import { SectionsContext } from 'contexts/SectionsProvider';
const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page4({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const placeholder1 =
		'Every day we help improve the lives of individuals by ensuring we supply our customers with the best foods on the market';
	const placeholder2 = [
		'Employing qualified nutritionists and dietitians that assist us in building trust',
		'Always focusing on the customer in every order we do and treat them as family',
		'Researching the market and always conscious of understanding a consumers needs',
		'Learning from our mistake to make business better',
		'Always sourcing and introducting new brands to the market',
		'Make sure customers are satisfied',
	];
	let initialValues = {
		a1: '',
		a2: ['', '', '', '', '', ''],
	};

	if (values) {
		const { a1, a2 } = values;
		initialValues = { a1, a2 };
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
							const { part1 } = visionOfSuccess;
							let countWasAnswered = 0;
							const oldA1 = part1?.q4?.answers?.a1;
							const oldA2 = part1?.q4?.answers?.a2;
							const wasAnsweredA1 = oldA1 ? oldA1.trim() != '' : false;
							const wasAnsweredA2 = oldA2
								? oldA2.findIndex((a) => a.trim() !== '') > -1
								: false;

							if (wasAnsweredA1 && wasAnsweredA2) countWasAnswered++;

							if (submitBtn === 'Continue') {
								const answers = { ...rest };

								const q4 = {
									...visionOfSuccess.part1?.q4,
									answers,
								};

								const { a1, a2 } = answers;

								let countIsAnswered = 0;
								const isAnsweredA1 = a1.trim() != '';
								const isAnsweredA2 = a2.findIndex((a) => a.trim() !== '') > -1;
								if (isAnsweredA1 && isAnsweredA2) countIsAnswered++;

								let newProgress = +visionOfSuccess.progress;
								let totalAnswered = +visionOfSuccess.totalAnswered;

								newProgress =
									newProgress +
									Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
										(countIsAnswered - countWasAnswered);

								totalAnswered += countIsAnswered - countWasAnswered;

								console.log(
									'P4 Q4: progress',
									newProgress,
									'totalAnswered:',
									totalAnswered
								);
								if (newProgress > 100) newProgress = 100;
								let data = {
									'section4.part1.q4.answers': answers,
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
									updateSection('visionOfSuccess', 'part1', { q4 });
									setStep(1.5);
								} else {
									alert('Something went wrong. Try again.');
								}
							}

							if (submitBtn === 'Skip') setStep(1.5);
							if (submitBtn === 'Previous') setStep(1.3);
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
								<Field name={'a1'}>
									{({ field, form }) => (
										<>
											<Text>
												4. MISSION (everyday): What do you do, who benefits and
												how do you do it. For example, "Domino's Pizza delivered
												in 20 minutes of it's free!"
											</Text>
											<br />
											<Textarea
												{...field}
												id="a1"
												variant="outline"
												type="text"
												h="60px"
												placeholder={isShowPlaceholder ? placeholder1 : ''}
											/>
										</>
									)}
								</Field>
								<br />
								<br />
								<Text>What we do everyday to align with our mission</Text>
								{props.values.a2.map((v, i) => (
									<FieldArray
										key={i}
										name={`a2.${i}`}
										render={(arrayHelpers) => (
											<Flex alignItems={'center'} my="15px" w="100%">
												<Text mr="20px" w="150px">
													Mission Action {i + 1}
												</Text>
												<Field name={`a2.${i}`}>
													{({ field, form }) => (
														<Input
															borderRadius={0}
															h="50px"
															p="1"
															{...field}
															id={`a2.${i}`}
															type="text"
															placeholder={
																isShowPlaceholder ? placeholder2[i] : ''
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
									currentStep={1.4}
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
