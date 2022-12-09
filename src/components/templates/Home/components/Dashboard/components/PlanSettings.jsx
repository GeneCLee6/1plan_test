import React, { useState, lazy, useContext, useEffect } from 'react';
import {
	Box,
	Text,
	Button,
	Grid,
	GridItem,
	Input,
	IconButton,
	FormLabel,
	FormControl,
	FormErrorMessage,
	Select,
	Flex,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import { AiOutlineUpload } from 'react-icons/ai';
import { Formik, Form, Field } from 'formik';
import { ChakraImage } from 'utils/images';
import {
	DEFAULT_BORDER_RADIUS,
	INDUSTRY_OPTIONS,
	BUSINESS_TYPES,
} from '../../config';
import { DatePickerField } from 'components/ui/DatePicker';
import { CalendarIcon } from '@chakra-ui/icons';
import { UserContext } from 'contexts/UserProvider';
import { getDocByRef } from 'services/firestore';
import { uploadFile } from 'services/storage';
import { useNavigate } from 'react-router-dom';
import {
	addData,
	updateData,
	setData,
	createDocReference,
} from 'services/firestore';
import { SnackbarContext } from 'contexts/SnackbarProvider';
import { SectionsContext } from 'contexts/SectionsProvider';

export default function PlanSettings() {
	const {
		contextValue: { styles },
		updateSnackbarStates,
	} = useContext(SnackbarContext);
	const {
		contextValue: { user },
		setUser,
	} = useContext(UserContext);
	const { setProgress, setTotalAnswered } = useContext(SectionsContext);
	const [initialValues, setInitialValues] = useState({
		startDate: '',
		industryCode: '',
		businessType: '',
		currency: '',
	});
	const [previousVersion, setPreviousVersion] = useState();
	// const defaultLogo = require('assets/images/image-placeholder.jpg');
	// const [logoUrl, setLogoUrl] = useState(defaultLogo);
	// const [logoFile, setLogoFile] = useState();
	const [isChangedLogo, setIsChangedLogo] = useState(false);
	const navigate = useNavigate();

	const createSectionRefs = async () => {
		const planSectionRefs = [];
		for (let i = 0; i < 5; i++) {
			const { docId: planSectionDocId } = await addData('planSections', {
				[`section${i + 1}`]: {},
			});
			const planSectionRef = createDocReference(
				`/planSections/${planSectionDocId}`
			);
			planSectionRefs.push(planSectionRef);
		}
		return planSectionRefs;
	};
	// const handleUploadImage = () => {
	// 	const input = document.createElement('input');
	// 	input.type = 'file';
	// 	input.accept = 'image/png, image/jpeg, image/jpg, image/webp';
	// 	input.onchange = (_this) => {
	// 		const files = Array.from(input.files);
	// 		const url = URL.createObjectURL(files[0]);
	// 		setLogoUrl(url);
	// 		setLogoFile(files[0]);
	// 		setIsChangedLogo(true);
	// 	};
	// 	input.click();
	// };

	useEffect(() => {
		if (user.company && previousVersion) {
			const loadPlanSettings = async () => {
				const planRef = user.company.planRefs[previousVersion - 1];
				const plan = await getDocByRef(planRef);
				const { _id, _planSectionRefs, startDate, settings, others } = plan;
				const { location, ...rest } = settings;
				setInitialValues({
					_id,
					...initialValues,
					...location,
					...others,
					...rest,
					startDate: new Date(startDate.seconds * 1000),
				});
				// if (rest?.logoUrl) setLogoUrl(rest.logoUrl);
			};
			loadPlanSettings();
		}
	}, [previousVersion]);
	return (
		<>
			<Box
				bgColor="#FFFFFF"
				h="100vh"
				p={4}
				borderRadius={DEFAULT_BORDER_RADIUS}
			>
				<Text fontWeight={'bold'} m={'10px'}>
					Plan Settings
				</Text>
				<Formik
					enableReinitialize
					initialValues={initialValues}
					onSubmit={async (values, actions) => {
						const { startDate, version, _id, ...others } = values;
						const planSettings = {
							planSectionRefs: await createSectionRefs(),
							settings: { ...others },
							startDate,
							version: user?.company?.planRefs
								? user?.company?.planRefs.length + 1
								: 1,
						};
						const { docId: newPlanDocId, error } = await addData(
							'plans',
							planSettings
						);
						// let newLogoUrl = null;
						// if (isChangedLogo) {
						// 	newLogoUrl = await uploadFile(
						// 		logoFile,
						// 		`plans/settings/logos/${newPlanDocId}.jpg`
						// 	);
						// }
						// if (newLogoUrl != null) {
						// 	await updateData('plans', newPlanDocId, {
						// 		'settings.logoUrl': newLogoUrl,
						// 	});
						// }

						const newPlanRef = createDocReference(`/plans/${newPlanDocId}`);
						const newPlanRefs = user.company.planRefs
							? [...user.company.planRefs, newPlanRef]
							: [newPlanRef];
						const newUser = { ...user };
						newUser.company.planRefs = newPlanRefs;
						newUser.company.planRef = newPlanRef;
						setUser(newUser);
						const { status } = await updateData('companies', user.company._id, {
							planRef: newPlanRef,
							planRefs: newPlanRefs,
						});
						if (status) {
							setProgress('quickStart', 0);
							setTotalAnswered('quickStart', 0);

							setProgress('rewardsCelebrations', 0);
							setTotalAnswered('rewardsCelebrations', 0);

							setProgress('strengthsOpportunities', 0);
							setTotalAnswered('strengthsOpportunities', 0);

							setProgress('visionOfSuccess', 0);
							setTotalAnswered('visionOfSuccess', 0);

							setProgress('numbers', 0);
							setTotalAnswered('numbers', 0);

							navigate('/start-plan/quick-start');
						} else {
							updateSnackbarStates({
								show: true,
								message: 'Something went wrong.',
								styles: {
									...styles,
									bgColor: 'red',
								},
							});
						}
						actions.setSubmitting(false);
					}}
				>
					{(props) => (
						<Form>
							<Grid
								h="200px"
								templateColumns="repeat(2, 1fr)"
								gap={8}
								px="50px"
							>
								<GridItem colSpan={1}>
									<FormLabel htmlFor="startDate" color="gray" fontSize={'14px'}>
										Start Date
									</FormLabel>
									<InputGroup
										w="50%"
										h="40px"
										my={'11px'}
										alignItems={'center'}
										border={'1px solid #E4E5E7'}
										borderRadius={'10px'}
									>
										<Box p="10px" w="100%">
											<DatePickerField name="startDate" />
										</Box>
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
								</GridItem>
								<GridItem colSpan={1}>
									<FormLabel
										htmlFor="previousVersion"
										color="gray"
										fontSize={'14px'}
									>
										Generate From Previous Versions
									</FormLabel>
									<Select
										variant="outline"
										placeholder="Select Previous Version"
										onChange={(e) => setPreviousVersion(e.target.value)}
									>
										{user?.company?.planRefs?.map((_, i) => (
											<option value={i + 1} key={i}>
												{i + 1}
											</option>
										))}
									</Select>
								</GridItem>
								<GridItem colSpan={1}>
									<Field name="industryCode">
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.industryCode && form.touched.industryCode
												}
											>
												<FormLabel
													htmlFor="industryCode"
													color="gray"
													fontSize={'14px'}
												>
													Select Industry Code
												</FormLabel>
												<Select
													{...field}
													id="industryCode"
													variant="outline"
													placeholder="Select Industry Code"
												>
													{INDUSTRY_OPTIONS.map((o, i) => (
														<option value={o} key={i}>
															{o}
														</option>
													))}
												</Select>
												<FormErrorMessage>
													{form.errors.industryCode}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</GridItem>

								<GridItem colSpan={1}>
									<Field name="currency">
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.currency && form.touched.currency
												}
											>
												<FormLabel
													htmlFor="currency"
													color="gray"
													fontSize={'14px'}
												>
													Currency
												</FormLabel>
												<Select
													{...field}
													id="currency"
													variant="outline"
													placeholder="Select Currency"
												>
													<option value={'AUD'}>AUD</option>
												</Select>
												<FormErrorMessage>
													{form.errors.currency}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</GridItem>
								<GridItem colSpan={1}>
									<Field name="businessType">
										{({ field, form }) => (
											<FormControl
												isInvalid={
													form.errors.businessType && form.touched.businessType
												}
											>
												<FormLabel
													htmlFor="businessType"
													color="gray"
													fontSize={'14px'}
												>
													Select Business Type
												</FormLabel>
												<Select
													{...field}
													id="businessType"
													variant="outline"
													placeholder="Select Business Type"
												>
													{BUSINESS_TYPES.map((t, i) => (
														<option value={t} key={i}>
															{t}
														</option>
													))}
												</Select>
												<FormErrorMessage>
													{form.errors.businessType}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</GridItem>

								{/* <GridItem colSpan={1}>
									<Field name="logo">
										{({ field, form }) => (
											<FormControl
												isInvalid={form.errors.logo && form.touched.logo}
											>
												<Flex>
													<FormLabel
														htmlFor="logo"
														color="gray"
														fontSize={'14px'}
														mr="20px"
													>
														Upload Logo
													</FormLabel>
													<Button
														leftIcon={<AiOutlineUpload />}
														colorScheme="grey"
														variant="outline"
														size={'sm'}
														onClick={handleUploadImage}
													>
														Upload
													</Button>
												</Flex>
												<ChakraImage
													src={logoUrl}
													alt="logo.png"
													height="100px"
													width="200px"
													m="10px 0 0 20px"
													object-fill="cover"
												/>
											</FormControl>
										)}
									</Field>
								</GridItem> */}
								<GridItem colSpan={2} display="flex" justifyContent={'center'}>
									<Button
										borderRadius="15px"
										w="60%"
										h="57px"
										bgColor={'#0273C2'}
										color="white"
										fontSize={'1.6rem'}
										isLoading={props.isSubmitting}
										type="submit"
									>
										Start New Plan
									</Button>
								</GridItem>
							</Grid>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
}
