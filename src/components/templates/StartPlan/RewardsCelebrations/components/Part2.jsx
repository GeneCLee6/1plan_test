import React, { lazy } from 'react';
import {
	Box,
	Input,
	Text,
	Flex,
	Button,
	Heading,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import KPIForm from '../KPIForm';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { useState, useContext } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { TOTAL_QUESTIONS } from '../configs';

const ButtonGroup = lazy(() => import('./../ButtonGroup'));
export default function Par2({ values, setPage, isShowPlaceholder }) {
	const {
		contextValue: { rewardsCelebrations },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);

	const isShow = isShowPlaceholder;
	console.log(isShowPlaceholder + 123);

	const initVal = {
		a1: [
			'',
			{ value: 0, unit: '%' },
			{ value: 0, unit: '%' },
			{ value: 0, unit: '%' },
			{ value: 0, unit: '%' },
		],
		a2: [
			'',
			{ value: 0, unit: '%' },
			{ value: 0, unit: '%' },
			{ value: 0, unit: '%' },
			{ value: 0, unit: '%' },
		],
	};

	const placeholders = [
		'Increase sales',
		'Increase the number of customers',
		'Reduce cost',
	];

	if (values) {
		const { a1, a2 } = values;
		initVal.a1 = a1;
		initVal.a2 = a2;
	}

	return (
		<>
			<Box bg={'white'} p="4">
				<Heading as="h3" size={'sm'} paddingBottom="5">
					2. Now think about how to measure this. What is the best result you
					think deserves a reward?
				</Heading>
				<Text>
					When setting KPIs, work on the basis that an 80% result is acceptable
					and anything greater than 80% should be rewarded. With this in mind,
					what is the best result you think deserves a reward?
				</Text>
				<br />

				<Box>
					<Grid my={5} templateColumns="1fr 4fr 2fr 2fr 2fr 2fr" gap={3}>
						<GridItem colSpan={2}>
							<Text textAlign={'center'} w="100%">
								My Quarterly KPI
							</Text>
						</GridItem>
						<GridItem colSpan={3}>
							<Text textAlign={'center'} w="100%">
								Measure #
							</Text>
						</GridItem>
					</Grid>

					<hr />

					<Formik
						enableReinitialize
						initialValues={initVal}
						onSubmit={async (values, actions) => {
							const oldAns = rewardsCelebrations?.part1?.q2?.answers;
							const wasAnswered = oldAns
								? Object.values(oldAns).findIndex((a) => a[0].trim() !== '') >
								  -1
								: false;

							if (values.submitBtn == 'Continue') {
								const { submitBtn, ...rest } = values;
								const answers = rest;

								const q2 = {
									...rewardsCelebrations.part1?.q2,
									answers,
								};
								const isAnswered =
									Object.values(answers).findIndex((a) => a[0].trim() !== '') >
									-1;
								let newProgress = rewardsCelebrations.progress;
								let totalAnswered = rewardsCelebrations.totalAnswered;

								if (isAnswered && !wasAnswered) {
									newProgress =
										+newProgress + Math.ceil((1 / TOTAL_QUESTIONS) * 100);
									totalAnswered++;
								}
								if (!isAnswered && wasAnswered) {
									newProgress =
										+newProgress - Math.ceil((1 / TOTAL_QUESTIONS) * 100);
									totalAnswered--;
								}
								if (newProgress > 100) newProgress = 100;
								let data = {
									'section2.part1.q2.answers': answers,
									'section2.totalAnswered': totalAnswered,
								};
								if (newProgress >= 0) {
									data = {
										...data,
										'section2.progress': newProgress,
									};
								}
								const { status } = await updateData(
									'planSections',
									rewardsCelebrations._id,
									data
								);

								if (status) {
									if (newProgress >= 0)
										setProgress('rewardsCelebrations', newProgress);
									setTotalAnswered('rewardsCelebrations', totalAnswered);
									updateSection('rewardsCelebrations', 'part1', { q2 });
									setPage(3);
								} else {
									alert('Something went wrong. Try again.');
								}
							}
							if (values.submitBtn == 'Skip') {
								setPage(3);
							}
							if (values.submitBtn == 'Previous') {
								setPage(1);
							}
						}}
					>
						{(props) => (
							<Form
								onSubmit={(e) => {
									const btn = e.nativeEvent.submitter;
									props.setFieldValue('submitBtn', btn.value);
									return props.handleSubmit(e);
								}}
							>
								<KPIForm
									values={props.values}
									pageNo={2}
									isShow={isShow}
									placeholders={placeholders}
								/>
								<ButtonGroup page={2} status={props} />
							</Form>
						)}
					</Formik>
				</Box>
			</Box>
		</>
	);
}
