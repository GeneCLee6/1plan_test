import React, { lazy } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { PART1_TITLE, FIRST_STEP, LAST_STEP } from '../configs';
import { Formik, Form } from 'formik';

const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page1({ setStep }) {
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
						initialValues={{}}
						onSubmit={(values, actions) => {
							const { submitBtn } = values;
							if (['Continue', 'Skip'].includes(submitBtn)) {
								setStep(1.2);
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
									In this section, we are focusing on the big picture, the
									long-term objectives. Remembering why you decided to go into
									business and what the end game looks like. Keep your answers
									in line with a 5 to 10-year time frame. Think big. Extra
									points if you can create a business that a listed company
									would want to buy.
								</Text>
								<br />

								<StepButtonGroup
									currentStep={1.1}
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
