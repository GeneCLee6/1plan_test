import React, { useState, useContext, useEffect, lazy } from 'react';
import {
	Box,
	Input,
	Text,
	Flex,
	Button,
	Heading,
	Image,
	Grid,
	GridItem,
	useDisclosure,
} from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { Field, Formik, Form } from 'formik';
import ButtonGroup from '../ButtonGroup';
import { SectionsContext } from 'contexts/SectionsProvider';
import { uploadFile } from 'services/storage';
import { updateData } from 'services/firestore';
import { TOTAL_QUESTIONS } from '../configs';

const SectionCompletedPopup = lazy(() =>
	import('../../components/SectionCompletedPopup')
);
export default function Part5({ values, setPage }) {
	const {
		contextValue: { rewardsCelebrations },
		setProgress,
		setTotalAnswered,
		updateSection,
	} = useContext(SectionsContext);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [picUrl, setPicUrl] = useState('/images/image-placeholder.jpg');
	const [picFile, setPicFile] = useState();

	const uploadPic = () => {
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

	const initVal = { picture: '' };
	useEffect(() => {
		if (values) {
			console.log(values);
			initVal['picture'] = values[0];
			setPicUrl(values[0]);
		}
	}, []);

	return (
		<>
			<SectionCompletedPopup
				isOpen={isOpen}
				onClose={onClose}
				onOpen={onOpen}
				message="You have completed the second section of your Plan."
				nextSectionRoute="/start-plan/strengths-opportunities"
			/>
			<Box bg={'white'} p="4">
				<Heading as="h3" size={'sm'} paddingBottom="5">
					6. Find an image that graphically represents the reward that YOU would
					like to receive. For example, a trip with the family to Byron Bay.
				</Heading>
				<br />
				<Box>
					<Formik
						enableReinitialize
						initialValues={initVal}
						onSubmit={async (values, actions) => {
							const oldAns = rewardsCelebrations?.part2?.q6?.answers;
							const wasAnswered = oldAns ? oldAns[0] != '' : false;
							if (values.submitBtn == 'Submit') {
								let newPicUrl = null;
								if (picFile) {
									newPicUrl = await uploadFile(
										picFile,
										`planSections/section2/${rewardsCelebrations._id}-q6.jpg`
									);
								}

								let answers = [picUrl];
								if (newPicUrl != null) {
									answers = [newPicUrl];
								}
								const q6 = {
									...rewardsCelebrations.part4?.q6,
									answers,
								};
								const isAnswered = answers[0] != '';
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
									'section2.part4.q6.answers': answers,
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
									updateSection('rewardsCelebrations', 'part4', { q6 });
									onOpen();
								} else {
									alert('Something went wrong. Try again.');
								}
							}
							if (values.submitBtn == 'Previous') {
								setPage(4);
							}
							actions.setSubmitting(false);
						}}
					>
						{(props) => (
							<Form
								onSubmit={(e) => {
									console.log(e.nativeEvent.submitter);
									const btn = e.nativeEvent.submitter;
									console.log(btn.value);
									props.setFieldValue('submitBtn', btn.value);
									return props.handleSubmit(e);
								}}
							>
								<Box
									display="flex"
									justifyContent={'center'}
									alignItems="center"
								>
									<Grid templateRows={'repeat(2, 3fr)'}>
										<GridItem>
											<Image
												boxSize="150px"
												src={picUrl}
												alt="file preview"
												objectFit="cover"
											/>
										</GridItem>
										<GridItem>
											<Button w={150} onClick={uploadPic}>
												<ArrowUpIcon />
												Upload
											</Button>
										</GridItem>
									</Grid>
								</Box>
								<ButtonGroup page={5} status={props} />
							</Form>
						)}
					</Formik>
				</Box>
			</Box>
		</>
	);
}
