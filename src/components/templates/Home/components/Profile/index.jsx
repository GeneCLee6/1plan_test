import React, { useState, useContext, useEffect } from 'react';
import {
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	IconButton,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import { updateData } from 'services/firestore';
import { Formik, Form, Field } from 'formik';
import { AiOutlineCamera } from 'react-icons/ai';
import { ChakraImage } from 'utils/images';
import { uploadFile } from 'services/storage';
import { DEFAULT_BORDER_RADIUS } from '../config';
import { Box } from '@chakra-ui/react';
import { SnackbarContext } from 'contexts/SnackbarProvider';
import { UserContext } from 'contexts/UserProvider';

export default function Profile() {
	const {
		contextValue: { styles },
		updateSnackbarStates,
	} = useContext(SnackbarContext);
	const {
		contextValue: { user },
		setUser,
	} = useContext(UserContext);
	const defaultImage = require('assets/images/image-placeholder.jpg');
	const [picUrl, setPicUrl] = useState(defaultImage);
	const [picFile, setPicFile] = useState();

	const [initialValues, setInitialValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});
	useEffect(() => {
		if (Object.keys(user).length) {
			const { firstName, lastName, email, photoUrl } = user;
			setInitialValues({ firstName, lastName, email });
			if (photoUrl) setPicUrl(photoUrl);
		}
	}, [user]);
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

	return (
		<>
			<Box
				bg="white"
				borderRadius={DEFAULT_BORDER_RADIUS}
				px="40px"
				pt="30px"
				h="100vh"
			>
				<Formik
					enableReinitialize
					initialValues={initialValues}
					onSubmit={async (values, actions) => {
						let newPicUrl = null;
						if (picFile) {
							newPicUrl = await uploadFile(
								picFile,
								`users/profile-pictures/${user._id}.jpg`
							);
						}

						const userData = { ...values };
						if (newPicUrl != null) userData['photoUrl'] = newPicUrl;
						const { status } = await updateData('users', user._id, userData);
						if (status) {
							setUser({ ...user, ...userData });
							updateSnackbarStates({
								show: true,
								message: 'Saved',
								styles: {
									...styles,
									bgColor: '#60fb7a',
								},
							});
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
							<Grid h="200px" templateColumns="repear(2,1fr)" gap={8}>
								<GridItem colSpan={2} display="flex" justifyContent={'center'}>
									<Box position={'relative'} h="100px">
										<ChakraImage
											src={picUrl}
											alt="logo.png"
											height="100px"
											width="100px"
											object-fill="cover"
											borderRadius={'50%'}
										/>
										<IconButton
											position="absolute"
											bottom="0"
											right="-2"
											borderRadius={'50%'}
											color="#0273C2"
											fontSize={'25px'}
											size="sm"
											icon={<AiOutlineCamera />}
											onClick={uploadPic}
										/>
									</Box>
								</GridItem>
								<GridItem colSpan={1}>
									<Field type="text" name="firstName">
										{({ field, form }) => (
											<FormControl>
												<FormLabel
													htmlFor="firstname"
													color="gray"
													fontSize={'14px'}
												>
													First Name
												</FormLabel>
												<Input {...field} id="firstname" variant="filled" />
											</FormControl>
										)}
									</Field>
								</GridItem>
								<GridItem colSpan={1}>
									<Field type="text" name="lastName">
										{({ field, form }) => (
											<FormControl>
												<FormLabel
													htmlFor="lastname"
													color="gray"
													fontSize={'14px'}
												>
													Last Name
												</FormLabel>
												<Input {...field} id="lastname" variant="filled" />
											</FormControl>
										)}
									</Field>
								</GridItem>
								<GridItem colSpan={2}>
									<Field type="text" name="email">
										{({ field, form }) => (
											<FormControl>
												<FormLabel
													htmlFor="email"
													color="gray"
													fontSize={'14px'}
												>
													Email
												</FormLabel>
												<Input {...field} id="email" variant="filled" />
											</FormControl>
										)}
									</Field>
								</GridItem>
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
										Save
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
