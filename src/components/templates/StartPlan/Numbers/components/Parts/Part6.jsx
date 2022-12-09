import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import React, { useContext, lazy } from 'react';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import {
	SingleTableField,
	TableNoSign,
	TablePercentageSign,
} from '../TableContainer';
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
export default function Part6({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { numbers },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const isShow = isShowPlaceholder;
	const placeholder1 = ['20', '50', '70', '90'];
	const placeholder2 = ['95', '95', '95', '95'];
	const placeholder3 = '120';
	let initialValues = {
		a1: ['', '', '', ''],
		a2: ['', '', '', ''],
		a3: '',
	};

	const { isOpen, onOpen, onClose } = useDisclosure();

	if (values) {
		const { q13, q14, q15 } = values;
		initialValues = { a1: q13, a2: q14, a3: q15 };
	}

	return (
		<>
			<SectionCompletedPopup
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				message="You have completed the fifth/last section of your Plan."
			/>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const steps = { Previous: 5 };
							const oldAnsQ13 = numbers.page6?.q13;
							const oldAnsQ14 = numbers.page6?.q14;
							const oldAnsQ15 = numbers.page6?.q15;
							const wasAnsweredQ13 = oldAnsQ13
								? oldAnsQ13.findIndex((a) => String(a).trim() != '') > -1
								: false;
							const wasAnsweredQ14 = oldAnsQ14
								? oldAnsQ14.findIndex((a) => String(a).trim() != '') > -1
								: false;
							const wasAnsweredQ15 = oldAnsQ15
								? String(oldAnsQ15[0]).trim() != ''
								: false;
							let countWasAnswered = 0;
							if (wasAnsweredQ13) countWasAnswered++;
							if (wasAnsweredQ14) countWasAnswered++;
							if (wasAnsweredQ15) countWasAnswered++;

							const { submitBtn, ...rest } = values;
							if (submitBtn == 'Submit') {
								const answers = Object.values(rest);
								const [q13, q14, q15] = answers;
								const isAnsweredQ13 =
									q13.findIndex((a) => String(a).trim() != '') > -1;
								const isAnsweredQ14 =
									q14.findIndex((a) => String(a).trim() != '') > -1;
								const isAnsweredQ15 = String(q15).trim() != '';
								let countIsAnswered = 0;
								if (isAnsweredQ13) countIsAnswered++;
								if (isAnsweredQ14) countIsAnswered++;
								if (isAnsweredQ15) countIsAnswered++;

								let newProgress = +numbers.progress;
								let totalAnswered = +numbers.totalAnswered;
								newProgress +=
									Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
									(countIsAnswered - countWasAnswered);
								totalAnswered += countIsAnswered - countWasAnswered;
								if (newProgress > 100) newProgress = 100;
								let data = {
									'section5.page6.q13': q13,
									'section5.page6.q14': q14,
									'section5.page6.q15': q15,
									'section5.totalAnswered': totalAnswered,
								};
								if (newProgress >= 0) {
									data = {
										...data,
										'section5.progress': newProgress,
									};
								}
								const { status } = await updateData(
									'planSections',
									numbers._id,
									data
								);

								if (status) {
									if (newProgress >= 0) setProgress('numbers', newProgress);
									setTotalAnswered('numbers', totalAnswered);
									updateSection('numbers', 'page6', { q13, q14, q15 });
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
								<Box w={'100%'}>
									<TableNoSign
										index={0}
										question={
											'13. How many owners of the business will there be?'
										}
										rowTitle={'Number of Owners'}
										isShow={isShow}
										placeholders={placeholder1}
									/>
								</Box>

								<Box width={'100%'}>
									<TablePercentageSign
										index={1}
										question={
											'14. What is your estimated Client retention rate? In other words, out of every 100 customers at the start of the period, what is the percentage of those that will continue to do business with you.'
										}
										rowTitle={'Client retention rate %'}
										isShow={isShow}
										placeholders={placeholder2}
									/>
								</Box>

								<Box width={'100%'}>
									<SingleTableField
										index={2}
										question={
											'15. How many new customers do you expect to pick up in?'
										}
										rowTitle={'New customers'}
										isShow={isShow}
										placeholders={placeholder3}
									/>
								</Box>

								<Flex my={'5'} justifyContent="end">
									<PreviousStepButton isSubmitting={props.isSubmitting} />
									<Box mx="5">
										<SubmitStepButton />
									</Box>
								</Flex>
							</Form>
						)}
					</Formik>
				</Box>
			</Box>
		</>
	);
}
