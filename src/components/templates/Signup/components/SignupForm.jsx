import {
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Flex,
	Text,
	Checkbox,
} from '@chakra-ui/react';
import React, { useState, useContext, lazy, useEffect } from 'react';
import { SnackbarContext } from 'contexts/SnackbarProvider';
import { Formik, Form, Field } from 'formik';
import { validation } from '../utils/validations';
import { signUp } from 'services/auth';
import { addData, setData, createDocReference } from 'services/firestore';
import { useNavigate } from 'react-router-dom';

const LandingFormLayout = lazy(() =>
	import('components/ui/landing/LandingFormLayout')
);
export default function SignupForm() {
	const {
		contextValue: { styles },
		updateSnackbarStates,
	} = useContext(SnackbarContext);
	const navigate = useNavigate();

	return (
		<>
			<LandingFormLayout>
				<Formik
					initialValues={{
						businessName: '',
						firstName: '',
						lastName: '',
						email: '',
						password: '',
						isAgreeTerms: false,
					}}
					onSubmit={async (values, actions) => {
						const {
							email,
							firstName,
							lastName,
							businessName,
							password,
							isAgreeTerms,
						} = values;

						if (!isAgreeTerms) {
							updateSnackbarStates({
								show: true,
								message: 'Please agree the terms of use',
								styles: {
									...styles,
									bgColor: 'red',
								},
							});
							return;
						}

						const { data, status } = await signUp(email, password);

						if (!status) {
							const isRegistered =
								data.errorCode === 'auth/email-already-in-use';
							const message = isRegistered
								? 'You have already signed up. You can login into your account.'
								: 'Error! Something went wrong.';
							updateSnackbarStates({
								show: true,
								message,
								styles: {
									...styles,
									bgColor: isRegistered ? 'orange' : 'red',
								},
							});
							actions.setSubmitting(false);
							if (isRegistered) navigate('/login');
							return;
						}

						const company = { businessName };

						const { docId: companyDocId } = await addData('companies', company);
						const companyRef = createDocReference(`companies/${companyDocId}`);
						const companyRefs = [companyRef];
						const user = {
							email,
							firstName,
							lastName,
							companyRef,
							companyRefs,
						};
						await setData('users', user, data.uid);
						// const { docId: planDocId } = await addData('plans', {
						// 	planSectionRefs: await createSectionRefs(),
						// });
						// const planRef = createDocReference(`/plans/${planDocId}`);
						// await setData(
						// 	'companies',
						// 	{
						// 		...company,
						// 		planRefs: [planRef],
						// 	},
						// 	companyDocId
						// );
						navigate('/login');
						updateSnackbarStates({
							show: true,
							message: 'Verification email sent. Please check.',
							styles: {
								...styles,
								bgColor: '#60fb7a',
							},
						});
						return;
					}}
				>
					{(props) => (
						<Form>
							<Field name="businessName" validate={validation.businessName}>
								{({ field, form }) => (
									<FormControl
										isInvalid={
											form.errors.businessName && form.touched.businessName
										}
									>
										<FormLabel
											htmlFor="businessName"
											color="gray"
											fontSize={'14px'}
										>
											Business Name
										</FormLabel>
										<Input {...field} id="businessName" variant="filled" />
										<FormErrorMessage>
											{form.errors.businessName}
										</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<br />
							<Flex gap="8">
								<Field name="firstName" validate={validation.firstName}>
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.firstName && form.touched.firstName
											}
										>
											<FormLabel
												htmlFor="firstName"
												color="gray"
												fontSize={'14px'}
											>
												First Name
											</FormLabel>
											<Input {...field} id="firstname" variant="filled" />
											<FormErrorMessage>
												{form.errors.firstName}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Field name="lastName" validate={validation.lastName}>
									{({ field, form }) => (
										<FormControl
											isInvalid={form.errors.lastName && form.touched.lastName}
										>
											<FormLabel
												htmlFor="lastName"
												color="gray"
												fontSize={'14px'}
											>
												Last Name
											</FormLabel>
											<Input {...field} id="lastName" variant="filled" />
											<FormErrorMessage>
												{form.errors.lastName}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</Flex>
							<br />
							<Field name="email" validate={validation.email}>
								{({ field, form }) => (
									<FormControl
										isInvalid={form.errors.email && form.touched.email}
									>
										<FormLabel htmlFor="email" color="gray" fontSize={'14px'}>
											Email
										</FormLabel>
										<Input {...field} id="email" variant="filled" />
										<FormErrorMessage>{form.errors.email}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<br />
							<Field name="password" validate={validation.password}>
								{({ field, form }) => (
									<FormControl
										isInvalid={form.errors.password && form.touched.password}
									>
										<FormLabel
											htmlFor="password"
											color="gray"
											fontSize={'14px'}
										>
											Password
										</FormLabel>
										<Input
											{...field}
											type="password"
											id="password"
											variant="filled"
										/>
										<FormErrorMessage>{form.errors.password}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Flex justifyContent={'start'} mt={10} mb={5}>
								<Field name="isAgreeTerms">
									{({ field, form }) => (
										<Checkbox
											{...field}
											color="gray"
											fontSize={'14px'}
											id="isAgreeTerms"
										>
											<Flex>
												I agree with &nbsp;
												<a href="https://" target="_blank">
													<Text color="rgba(28, 157, 225, 0.68)">
														terms of use
													</Text>
												</a>
											</Flex>
										</Checkbox>
									)}
								</Field>
							</Flex>
							<Flex justifyContent={'center'}>
								<Button
									mt={4}
									mr={8}
									colorScheme="blue"
									isLoading={props.isSubmitting}
									type="submit"
									w={'100%'}
									borderRadius={15}
									py={6}
									fontSize={'20px'}
								>
									Sign Up
								</Button>
							</Flex>
						</Form>
					)}
				</Formik>
			</LandingFormLayout>
		</>
	);
}
