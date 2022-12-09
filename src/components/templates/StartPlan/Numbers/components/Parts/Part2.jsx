import { Box, Text, Flex } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import React, { useContext, lazy } from 'react';
import { Formik, Form, connect } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { TOTAL_QUESTIONS } from '../../config';
import {
	TableNoSign,
	TableDollarSign,
	SingleTableField,
} from '../TableContainer';

import { updateData } from 'services/firestore';

const ContinueStepButton = lazy(() =>
	import('components/ui/start-plan/ContinueStepButton')
);
const SkipStepButton = lazy(() =>
	import('components/ui/start-plan/SkipStepButton')
);
const PreviousStepButton = lazy(() =>
	import('components/ui/start-plan/PreviousStepButton')
);

export default function Part2({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { numbers },
		setProgress,
		updateSection,
		setTotalAnswered,
	} = useContext(SectionsContext);

	const isShow = isShowPlaceholder;
	const placeholder1 = ['1500', '1750', '2000', '5000'];
	const placeholder2 = ['1000', '1200', '1380', '1450'];
	const placeholder3 = ['1500', '1750', '2000', '5000'];

	let initialValues = {
		a1: ['', '', '', ''],
		a2: ['', '', '', ''],
		a3: [''],
	};

	if (values) {
		const { q3, q4, q5 } = values;
		initialValues = { a1: q3, a2: q4, a3: q5 };
	}

	return (
		<>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const { submitBtn, ...rest } = values;

							let countWasAnswered = 0;
							const oldAnsQ3 = numbers.page2?.q3;
							const oldAnsQ4 = numbers.page2?.q4;
							const oldAnsQ5 = numbers.page2?.q5;
							const wasAnsweredQ3 = oldAnsQ3
								? oldAnsQ3.findIndex((a) => String(a).trim() != '') > -1
								: false;
							const wasAnsweredQ4 = oldAnsQ4
								? oldAnsQ4.findIndex((a) => String(a).trim() != '') > -1
								: false;
							const wasAnsweredQ5 = oldAnsQ5
								? oldAnsQ4.findIndex((a) => String(a).trim() != '') > -1
								: false;

							if (wasAnsweredQ3) countWasAnswered++;
							if (wasAnsweredQ4) countWasAnswered++;
							if (wasAnsweredQ5) countWasAnswered++;

							const steps = { Skip: 3, Previous: 1, Continue: 3 };
							if (submitBtn === 'Continue') {
								const { a1: q3, a2: q4, a3: q5 } = rest;

								let countIsAnswered = 0;
								const isAnsweredQ3 =
									q3.findIndex((a) => String(a).trim() != '') > -1;
								const isAnsweredQ4 =
									q4.findIndex((a) => String(a).trim() != '') > -1;
								const isAnsweredQ5 =
									q5.findIndex((a) => String(a).trim() != '') > -1;

								if (isAnsweredQ3) countIsAnswered++;
								if (isAnsweredQ4) countIsAnswered++;
								if (isAnsweredQ5) countIsAnswered++;
								let newProgress = +numbers.progress;
								let totalAnswered = +numbers.totalAnswered;
								newProgress +=
									Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
									(countIsAnswered - countWasAnswered);
								totalAnswered += countIsAnswered - countWasAnswered;
								if (newProgress > 100) newProgress = 100;

								let data = {
									'section5.page2.q3': q3,
									'section5.page2.q4': q4,
									'section5.page2.q5': q5,
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
									updateSection('numbers', 'page2', { q3, q4, q5 });
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
								<Box w={'100%'}>
									<TableNoSign
										question={
											'3. How many clients or customers do you expect to service or invoice in:'
										}
										rowTitle={'No. of Clients'}
										index={0}
										isShow={isShow}
										placeholders={placeholder1}
									/>
								</Box>
								<Box width={'100%'}>
									<TableDollarSign
										question={
											'4. What is your estimated average sale or invoice value (each)?'
										}
										rowTitle={'Average Sale'}
										index={1}
										isShow={isShow}
										placeholders={placeholder2}
									/>
								</Box>
								<Box width={'100%'}>
									<TableNoSign
										question={
											'5. How many times would you service the same customer or client?'
										}
										rowTitle={'Number of transactions'}
										index={2}
										isShow={isShow}
										placeholders={placeholder3}
									/>
								</Box>
								<Flex my={'5'} justifyContent="end">
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
