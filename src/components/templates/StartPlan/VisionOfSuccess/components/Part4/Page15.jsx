import React, { lazy, useState, useContext, useEffect } from 'react';
import { Box, Text, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { FIRST_STEP, LAST_STEP, TOTAL_QUESTIONS } from '../configs';
import { Formik, Form, Field, FieldArray } from 'formik';
import { ChakraImage } from 'utils/images';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { uploadFile } from 'services/storage';

const SectionCompletedPopup = lazy(() =>
	import('../../../components/SectionCompletedPopup')
);
const StepButtonGroup = lazy(() => import('../StepButtonGroup'));
export default function Page14({ values, setStep }) {
	const {
		contextValue: { visionOfSuccess },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const defaultImage = require('assets/images/image-placeholder.jpg');
	const [picUrl, setPicUrl] = useState(defaultImage);
	const [picFile, setPicFile] = useState();
	const handleUploadImage = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/png, image/jpeg, image/jpg, image/webp';
		input.click();
		input.onchange = (e) => {
			if (e.target.files) {
				const url = URL.createObjectURL(e.target.files[0]);
				setPicUrl(url);
				setPicFile(e.target.files[0]);
			}
		};
	};

	let initialValues = { pic: '' };
	useEffect(() => {
		if (values) {
			const pic = values;
			initialValues = { pic };
			setPicUrl(values[0]);
		}
	}, []);

	return (
		<>
			<SectionCompletedPopup
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				message="You have completed the forth section of your Plan."
				nextSectionRoute="/start-plan/numbers"
			/>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const { submitBtn } = values;
							const { part4 } = visionOfSuccess;
							const wasAnswered = part4?.q11
								? part4?.q11.answers[0].trim() !== ''
								: false;
							if (submitBtn === 'Submit') {
								let newPicUrl = null;
								if (picFile) {
									newPicUrl = await uploadFile(
										picFile,
										`planSections/section4/${visionOfSuccess._id}-q11.jpg`
									);
								}

								let answers = [picUrl];
								if (newPicUrl != null) {
									answers = [newPicUrl];
								}
								const q11 = {
									...visionOfSuccess.part4?.q11,
									answers,
								};

								const isAnswered = answers[0].trim() !== '';
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
									'P15 Q11: progress',
									newProgress,
									'totalAnswered:',
									totalAnswered
								);
								let data = {
									'section4.part4.q11.answers': answers,
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
									updateSection('visionOfSuccess', 'part4', { q11 });
									onOpen();
								} else {
									alert('Something went wrong. Try again.');
								}
							}
							if (submitBtn === 'Previous') setStep(4.14);

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
								<Text>11. Owners' Rewards & Celebrations</Text>
								<Text>
									Find an image that represents this reward and upload it here
								</Text>
								<br />
								<Flex alignItems="center" direction={'column'}>
									<Box border="1px solid grey" w="300px">
										<ChakraImage
											src={picUrl}
											alt="logo.png"
											height="250px"
											width="100%"
											object-fill="cover"
										/>
									</Box>
									<Button my="20px" onClick={handleUploadImage}>
										Upload
									</Button>
								</Flex>
								<br />
								<StepButtonGroup
									currentStep={4.15}
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
