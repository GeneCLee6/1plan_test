import { Box, Flex } from '@chakra-ui/react';
import React, { useContext, lazy } from 'react';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { TablePercentageSign, TableNoSign } from '../TableContainer';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../../config';

const ContinueStepButton = lazy(() =>
	import('components/ui/start-plan/ContinueStepButton')
);
const SkipStepButton = lazy(() =>
	import('components/ui/start-plan/SkipStepButton')
);
const PreviousStepButton = lazy(() =>
	import('components/ui/start-plan/PreviousStepButton')
);
export default function Part5({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { numbers },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const isShow = isShowPlaceholder;
	const placeholder1 = ['16', '16', '15', '14'];
	const placeholder2 = ['50', '40', '40', '0'];
	let initialValues = {
		a1: ['', '', '', ''],
		a2: ['', '', '', ''],
		a3: ['', '', '', ''],
	};

	if (values) {
		const { q10, q11, q12 } = values;
		initialValues = { a1: q10, a2: q11, a3: q12 };
	}
	return (
		<>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const steps = { Skip: 6, Previous: 4, Continue: 6 };
							const oldAnsQ10 = numbers.page5?.q10;
							const oldAnsQ11 = numbers.page5?.q11;
							const oldAnsQ12 = numbers.page5?.q12;
							const wasAnsweredQ10 = oldAnsQ10
								? oldAnsQ10.findIndex((a) => String(a).trim() != '') > -1
								: false;
							const wasAnsweredQ11 = oldAnsQ11
								? oldAnsQ11.findIndex((a) => String(a).trim() != '') > -1
								: false;
							const wasAnsweredQ12 = oldAnsQ12
								? oldAnsQ12.findIndex((a) => String(a).trim() != '') > -1
								: false;
							let countWasAnswered = 0;
							if (wasAnsweredQ10) countWasAnswered++;
							if (wasAnsweredQ11) countWasAnswered++;
							if (wasAnsweredQ12) countWasAnswered++;
							const { submitBtn, ...rest } = values;
							if (submitBtn === 'Continue') {
								const answers = Object.values(rest);
								const [q10, q11, q12] = answers;

								const isAnsweredQ10 =
									q10.findIndex((a) => String(a).trim() != '') > -1;
								const isAnsweredQ11 =
									q11.findIndex((a) => String(a).trim() != '') > -1;
								const isAnsweredQ12 =
									q12.findIndex((a) => String(a).trim() != '') > -1;
								let countIsAnswered = 0;
								if (isAnsweredQ10) countIsAnswered++;
								if (isAnsweredQ11) countIsAnswered++;
								if (isAnsweredQ12) countIsAnswered++;

								let newProgress = +numbers.progress;
								let totalAnswered = +numbers.totalAnswered;
								newProgress +=
									Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
									(countIsAnswered - countWasAnswered);
								totalAnswered += countIsAnswered - countWasAnswered;
								if (newProgress > 100) newProgress = 100;
								let data = {
									'section5.page5.q10': q10,
									'section5.page5.q11': q11,
									'section5.page5.q12': q12,
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
									updateSection('numbers', 'page5', { q10, q11, q12 });
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
									<TablePercentageSign
										index={0}
										question={
											'10. What are the everyday business costs as a percentage of your sales that you need to pay over the next 90 days? These are things like rent, accounting, administrative support, printing and stationery, travel to meetings etc.'
										}
										rowTitle={'Overhead Spend as a % of Sales'}
										isShow={isShow}
										placeholders={placeholder1}
									/>
								</Box>

								<Box width={'100%'}>
									<TableNoSign
										index={1}
										question={
											'11. Thinking of you work/life balance, how many hours do you want to work per week? Enter total hours for all owners.'
										}
										rowTitle={'Owners’ hours worked per week'}
										isShow={isShow}
										placeholders={placeholder2}
									/>
								</Box>

								<Box width={'100%'}>
									<TableNoSign
										index={2}
										question={
											'12. How many Full-Time people do you intend to employ or contract excluding owners?'
										}
										rowTitle={'Full Time People'}
										isShow={isShow}
										placeholders={placeholder2}
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
