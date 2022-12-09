import React, { lazy } from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { PART3_TITLE, FIRST_STEP, LAST_STEP } from '../configs';
import { Formik, Form } from 'formik';
import { useContext } from 'react';
import { SectionsContext } from 'contexts/SectionsProvider';

const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page8({ values, setStep }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
		updateSection,
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
				{PART3_TITLE}
			</Heading>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={{}}
						onSubmit={(values, actions) => {
							const { submitBtn } = values;

							if (['Continue', 'Skip'].includes(submitBtn)) setStep(3.9);
							if (submitBtn === 'Previous') setStep(2.7);
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
									There are only 24 hours in a day, so prioritising is
									essential. We have all heard of the Pareto principal or the
									80/20 rule which states that roughly 80% of the effects come
									from 20% of the causes. Or looking at it another way, 20% of
									effort produces 80% of the results. We are going to focus on
									the 20%, also known as “the low hanging fruit”. Keep this in
									mind as you answer the following questions.
								</Text>
								<br />

								<StepButtonGroup
									currentStep={3.8}
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
