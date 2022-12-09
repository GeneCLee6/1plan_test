import React, { lazy, useContext } from 'react';
import {
	Box,
	Text,
	Input,
	Flex,
	Textarea,
	useDisclosure,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../../config';
const SectionCompletedPopup = lazy(() =>
	import('../../../components/SectionCompletedPopup')
);
const PreviousStepButton = lazy(() =>
	import('components/ui/start-plan/PreviousStepButton')
);
const SubmitStepButton = lazy(() =>
	import('components/ui/start-plan/SubmitStepButton')
);

export default function Q17({ setStep, values, isShowPlaceholder }) {
	const {
		contextValue: { strengthsOpportunities },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	let initialValues = {
		a1: '',
	};
	if (values) {
		const [a1] = values;
		initialValues = { a1 };
	}

	return (
		<>
			<SectionCompletedPopup
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				message="You have completed the third section of your Plan."
				nextSectionRoute="/start-plan/vision-of-success"
			/>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Text fontSize={'16px'}>
						17. Well done, you have completed the Strengths & Opportunities
						section of your business plan. Would you like to leave some feedback
						of your experience?
					</Text>

					<br />

					<Box width={'100%'}>
						<Formik
							enableReinitialize
							initialValues={initialValues}
							onSubmit={async (values, actions) => {
								const oldAns = strengthsOpportunities.part4?.q17?.answers;
								const wasAnswered = oldAns ? oldAns[0].trim() != '' : false;

								const { submitBtn, ...rest } = values;
								const steps = {
									Previous: 4.5,
								};
								if (submitBtn === 'Submit') {
									const answers = Object.values(rest);
									const isAnswered = answers[0].trim() != '';
									const q17 = {
										...strengthsOpportunities?.part4?.q17,
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
										'section3.part4.q17.answers': answers,
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
										updateSection('strengthsOpportunities', 'part4', { q17 });
										onOpen();
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
											<Flex alignContent={'center'}>
												<Textarea
													{...field}
													id={`a1`}
													variant="outline"
													type="text"
													height={'150px'}
													placeholder={
														isShowPlaceholder
															? 'Please input your feedback...'
															: ''
													}
													borderRadius={0}
													whiteSpace={'normal'}
												/>
											</Flex>
										)}
									</Field>

									<br />
									<Flex my="5" justifyContent={'end'}>
										<Box mx="5">
											<PreviousStepButton isSubmitting={props.isSubmitting} />
										</Box>
										<SubmitStepButton isSubmitting={props.isSubmitting} />
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
