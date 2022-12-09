import React, { useState, useContext, lazy, useEffect } from 'react';
import {
	Box,
	Heading,
	Input,
	Text,
	Flex,
	Button,
	InputGroup,
	IconButton,
	InputRightElement,
	useDisclosure,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { Formik, Form, Field } from 'formik';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
import { uploadFile } from 'services/storage';
import { TOTAL_QUESTIONS } from '../configs';
import { DatePickerField } from 'components/ui/DatePicker';
import { ChakraImage } from 'utils/images';
const SectionCompletedPopup = lazy(() =>
	import('../../components/SectionCompletedPopup')
);
const PreviousStepButton = lazy(() =>
	import('components/ui/start-plan/PreviousStepButton')
);
const SubmitStepButton = lazy(() =>
	import('components/ui/start-plan/SubmitStepButton')
);
export default function Part3({ values, setStep, isShowPlaceholder }) {
	const {
		contextValue: { quickStart },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const defaultImage = require('assets/images/image-placeholder.jpg');
	const [imageUrl, setImageUrl] = useState(defaultImage);
	const [imageFile, setImageFile] = useState();
	const [initialValues, setInitialValues] = useState({
		q8: '',
		q9: '',
		q10: '',
	});
	const placeholders = {
		q8: 'Please input the quarter end date.',
		q9: 'For example, reduce errors by 100%',
		q10: 'Consolidation',
	};
	useEffect(() => {
		if (values) {
			const { q8, q9, q10, q11 } = values;
			setInitialValues({
				q8: q8 ? new Date(q8.seconds * 1000) : '',
				q9,
				q10,
			});
			setImageUrl(q11);
		}
	}, [values]);

	const uploadImage = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/png, image/jpeg, image/jpg, image/webp';
		input.click();
		input.onchange = (e) => {
			if (e.target.files) {
				const url = URL.createObjectURL(e.target.files[0]);
				setImageUrl(url);
				setImageFile(e.target.files[0]);
			}
		};
	};
	return (
		<>
			<SectionCompletedPopup
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				message="You have completed the first section of your Plan."
				nextSectionRoute="/start-plan/rewards-celebrations"
			/>
			<Box bgColor="#F7F9FA" p="5">
				<Heading fontSize={'18px'}>Diarising Quad B Time.</Heading>
				<Text>
					The final step in this process is to block out Quad B time in your
					diary. Pick 2 hours on a set day of the week to action the items in
					your plan. No phone calls, no emails, no notification alerts, no
					drop-ins, no distractions. Turn off the phone, lock yourself away for
					2 hours and concentrate on the issue at hand.
				</Text>
				<Text my="3">
					Grab your diary now and set up a recurring appointment that works for
					you.
				</Text>
			</Box>
			<Heading px="5" py="7" fontSize={'15'} bg="#F7F9FA">
				Part 3 - QUARTERLY THEME
			</Heading>
			<Box p="4" bg="white">
				<Box pl="6" pr="10">
					<Formik
						enableReinitialize
						initialValues={initialValues}
						onSubmit={async (values, actions) => {
							const { submitBtn, ...rest } = values;
							const steps = {
								Previous: 2.6,
							};
							let countWasAnswered = 0;
							if (quickStart.part3) {
								const { q8, q9, q10 } = quickStart?.part3;
								const oldAns = [q8, q9, q10, imageUrl];
								countWasAnswered = oldAns.filter((a) => {
									if (typeof a == 'string') return a.trim() != '';
									else return a != null || a != undefined;
								}).length;
							}
							if (submitBtn == 'Submit') {
								const answers = { ...rest };
								const contextAnswers = { ...rest };
								const dateStr = answers.q8;
								if (dateStr) {
									const date = new Date(dateStr);
									const seconds = Math.floor(date.getTime() / 1000);
									answers.q8 = date;
									contextAnswers.q8 = { seconds };
								}

								let newImageUrl = null;
								if (imageFile) {
									newImageUrl = await uploadFile(
										imageFile,
										`planSections/section1/${quickStart._id}-q11.jpg`
									);
								}

								const part3 = {
									...(quickStart.part3 ? quickStart.part3 : undefined),
									...answers,
									q8: contextAnswers.q8,
									q11: newImageUrl != null ? newImageUrl : imageUrl,
								};
								const { q8, q9, q10 } = answers;
								const ans = [q8, q9, q10, part3.q11];
								const countIsAnswered = ans.filter((a) => {
									if (typeof a == 'string') return a.trim() != '';
									else return a != null || a != undefined;
								}).length;
								let newProgress = quickStart.progress;
								let totalAnswered = quickStart.totalAnswered;

								newProgress =
									+quickStart.progress +
									Math.ceil((1 / TOTAL_QUESTIONS) * 100) *
										(countIsAnswered - countWasAnswered);
								totalAnswered += countIsAnswered - countWasAnswered;
								let data = {
									[`section1.part3.q8`]: q8,
									[`section1.part3.q9`]: q9,
									[`section1.part3.q10`]: q10,
									[`section1.part3.q11`]: part3.q11,
									'section1.totalAnswered': totalAnswered,
								};
								if (newProgress > 100) newProgress = 100;
								if (newProgress >= 0) {
									data = {
										...data,
										'section1.progress': newProgress,
									};
								}
								const { status } = await updateData(
									'planSections',
									quickStart._id,
									data
								);
								if (status) {
									if (newProgress >= 0) setProgress('quickStart', newProgress);
									setTotalAnswered('quickStart', totalAnswered);
									updateSection('quickStart', 'part3', part3);
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
								<Box w="100%">
									<Text>8. Enter your Quarter end date?</Text>
									<InputGroup
										w="80%"
										h="50px"
										border={'1px solid #E4E5E7'}
										p={'1'}
									>
										<DatePickerField width="100%" name={`q8`} />
										<InputRightElement
											width="4.5rem"
											display={'flex'}
											alignItems="center"
										>
											<IconButton
												variant="unstyled"
												size="lg"
												icon={<CalendarIcon />}
												bgColor="transparent"
											/>
										</InputRightElement>
									</InputGroup>
								</Box>
								<br />
								<Box w="100%">
									<Text>
										9. Indentify your Measurable Target or Critical Number for
										the Quarter?
									</Text>
									<Field name="q9">
										{({ field, form }) => (
											<Input
												borderRadius={0}
												h="50px"
												w="80%"
												p={'1'}
												{...field}
												id="q9"
												type="text"
												placeholder={isShowPlaceholder ? placeholders.q9 : ''}
											/>
										)}
									</Field>
								</Box>
								<br />
								<Box w="100%">
									<Text>
										10. What is the one word or the one phrase that best
										describes your goals for the quarter?
									</Text>
									<Field name="q10">
										{({ field, form }) => (
											<Input
												borderRadius={0}
												h="50px"
												w="80%"
												p={'1'}
												{...field}
												id="q10"
												type="text"
												placeholder={isShowPlaceholder ? placeholders.q10 : ''}
											/>
										)}
									</Field>
								</Box>
								<br />
								<Box w="100%">
									<Text>
										11. Find an image that excites you and upload it below!
									</Text>
									<Flex
										direction="column"
										alignItems={'center'}
										justifyContent={'center'}
									>
										<ChakraImage
											src={imageUrl}
											height="250px"
											width="300px"
											object-fill="cover"
										/>

										<Button mt="30px" onClick={uploadImage}>
											Upload
										</Button>
									</Flex>
								</Box>
								<Flex my="10" justifyContent={'end'}>
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
