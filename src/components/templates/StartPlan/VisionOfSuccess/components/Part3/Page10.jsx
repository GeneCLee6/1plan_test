import React, { lazy, useContext } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import {
	PART3_TITLE,
	FIRST_STEP,
	LAST_STEP,
	TOTAL_QUESTIONS,
} from '../configs';
import { Formik, Form } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { isSectionAnswered } from 'utils/common';
const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
const TwoColumnsInputs = lazy(() => import('../TwoColumnsInputs'));
export default function Page10({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const isShow = isShowPlaceholder;
	const placeholders = [
		[
			'Expand home brand range',
			'Bad down on warehouse facilities and improvements',
			'Find economies in logistice',
			'',
			'',
		],
		[
			'Successful home brand distribution',
			'Warehouse facilities in place',
			'Efficient and effective logistic service',
			'',
			'',
		],
	];
	let initialValues = {
		a1: ['', ''],
		a2: ['', ''],
		a3: ['', ''],
		a4: ['', ''],
		a5: ['', ''],
	};

	if (values) {
		const { a1, a2, a3, a4, a5 } = values;
		initialValues = { a1, a2, a3, a4, a5 };
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
				{PART3_TITLE}
			</Heading>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const { submitBtn, ...rest } = values;
							const { part3 } = visionOfSuccess;
							const wasAnswered = part3?.q8b
								? isSectionAnswered({ objArr: part3.q8b.answers })
								: false;
							if (submitBtn === 'Continue') {
								const answers = rest;
								const q8b = {
									...visionOfSuccess.part3?.q8b,
									answers,
								};

								const isAnswered = isSectionAnswered({ objArr: answers });
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
									'P10 Q8B: progress',
									newProgress,
									'totalAnswered:',
									totalAnswered
								);
								let data = {
									'section4.part3.q8b.answers': answers,
									'section4.totalAnswered': totalAnswered,
								};
								if (newProgress > 100) newProgress = 100;
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
									updateSection('visionOfSuccess', 'part3', { q8b });
									setStep(3.11);
								} else {
									alert('Something went wrong. Try again.');
								}
							}
							if (['Continue', 'Skip'].includes(submitBtn)) setStep(3.11);
							if (submitBtn === 'Previous') setStep(3.9);

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
									b. Now cast your mind forward 5-10 years and look back, which
									of your actions and goal achievements have made the biggest
									difference?
								</Text>
								<br />
								<Text>3 Year Priorities and Desired Goals & Outcomes</Text>
								<TwoColumnsInputs
									headers={['Desired Goal', 'Desired Outcomes']}
									values={props.values}
									isShow={isShow}
									placeholders={placeholders}
								/>
								<StepButtonGroup
									currentStep={'3.10'}
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
