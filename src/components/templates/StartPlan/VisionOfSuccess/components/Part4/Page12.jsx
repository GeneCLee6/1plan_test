import React, { lazy } from 'react';
import {
	Box,
	Flex,
	Text,
	Heading,
	OrderedList,
	ListItem,
} from '@chakra-ui/react';
import { PART4_TITLE, FIRST_STEP, LAST_STEP } from '../configs';
import { Formik, Form } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { useContext } from 'react';

const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page12({ setStep }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
	} = useContext(SectionsContext);

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
				{PART4_TITLE}
			</Heading>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={{}}
						onSubmit={(values, actions) => {
							const { submitBtn } = values;
							if (['Continue', 'Skip'].includes(submitBtn)) {
								setStep(4.13);
							}
							if (submitBtn === 'Previous') {
								setProgress('visionOfSuccess', visionOfSuccess.progress - 10);
								setStep(3.11);
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
									Review the Annual Priorities as well as your 3, 5-10 year
									Actions and Habits you have laid out on the left. Use the
									80/20 rule to identify 2 things you could do that would have
									the biggest impact on your long-term plans. For example:
								</Text>
								<br />
								<OrderedList>
									<ListItem>Lift current gross profit margins by 3%</ListItem>
									<ListItem>
										Improve staff productivity by 5% through systems
										improvements
									</ListItem>
								</OrderedList>
								<br />

								<StepButtonGroup
									currentStep={4.12}
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
