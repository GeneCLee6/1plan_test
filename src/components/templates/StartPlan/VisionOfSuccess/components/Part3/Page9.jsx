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

export default function Page9({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const isShow = isShowPlaceholder;
	const placeholders = [
		[
			'Management of our margins',
			'Limit manual processes and increase automation',
			'Better grip on market trents',
			'Discover a market gap/opportunity for a potential brand',
		],
		[
			'Consolldated product supply lines and margins',
			'Systemised business',
			'Product rationlisation and rotation',
			'Commence trial home brands.',
		],
	];
	let initialValues = {
		a1: ['', ''],
		a2: ['', ''],
		a3: ['', ''],
		a4: ['', ''],
	};

	if (values) {
		const { a1, a2, a3, a4 } = values;
		initialValues = { a1, a2, a3, a4 };
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
							const wasAnswered = part3?.q8a
								? isSectionAnswered({ objArr: part3.q8a.answers })
								: false;
							if (submitBtn === 'Continue') {
								const answers = rest;
								const q8a = {
									...visionOfSuccess.part3?.q8a,
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
								let data = {
									'section4.part3.q8a.answers': answers,
									'section4.totalAnswered': totalAnswered,
								};
								console.log(
									'P9 Q8A: progress',
									newProgress,
									'totalAnswered:',
									totalAnswered
								);
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
									updateSection('visionOfSuccess', 'part3', { q8a });
									setStep('3.10');
								} else {
									alert('Something went wrong. Try again.');
								}
							}
							if (submitBtn === 'Skip') setStep('3.10');
							if (submitBtn === 'Previous') setStep(3.8);

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
									8. Now cast your mind forward 1 year and look back, which of
									your actions and goal achievements have made the biggest
									difference?
								</Text>
								<br />
								<Text>a. Annual Priorities and Desired Goals & Outcomes</Text>
								<TwoColumnsInputs
									headers={['Desired Goal', 'Desired Outcomes']}
									values={props.values}
									isShow={isShow}
									placeholders={placeholders}
								/>
								<StepButtonGroup
									currentStep={3.9}
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
