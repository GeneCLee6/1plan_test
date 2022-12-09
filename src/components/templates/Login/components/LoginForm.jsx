import {
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Flex,
	Link,
	Text,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';
import React, { useContext, lazy, useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { Formik, Form, Field } from 'formik';
import { validation } from '../utils/validations';
import { login } from 'services/auth';
import { SnackbarContext } from 'contexts/SnackbarProvider';
import { UserContext } from 'contexts/UserProvider';
import { useNavigate } from 'react-router-dom';
import { getUser } from 'services/firestore';

const LandingFormLayout = lazy(() =>
	import('components/ui/landing/LandingFormLayout'),
);

export default function LoginForm() {
	const {
		contextValue: { styles },
		updateSnackbarStates,
	} = useContext(SnackbarContext);

	const { setAuth, setUser, setIsLogin } = useContext(UserContext);

	const navigate = useNavigate();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<>
			<LandingFormLayout>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={async (values, actions) => {
						const { status, data, error } = await login(
							values.email,
							values.password,
						);
						if (!status) {
							actions.setSubmitting(false);
							updateSnackbarStates({
								show: true,
								message: 'Invalid Account',
								styles: {
									...styles,
									bgColor: 'red',
								},
							});
							return;
						}
						const { emailVerified, uid } = data;
						// TODO: true - temporary for development
						if (true || emailVerified) {
							const user = await getUser(uid);
							setAuth(data);
							setIsLogin(true);
							setUser(user);

							navigate('/home/dashboard');
						} else {
							updateSnackbarStates({
								show: true,
								message: 'Please verify your email.',
								styles: {
									...styles,
									bgColor: 'orange',
								},
							});
						}
					}}
				>
					{(props) => (
						<Form>
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
										<InputGroup size="md">
											<Input
												{...field}
												type={show ? 'text' : 'password'}
												id="password"
												variant="filled"
											/>
											<InputRightElement width="4.5rem">
												<Button
													h="1.75rem"
													size="sm"
													color="gray"
													onClick={handleClick}
												>
													{show ? <ViewIcon /> : <ViewOffIcon />}
												</Button>
											</InputRightElement>
										</InputGroup>
										<FormErrorMessage>{form.errors.password}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Flex justifyContent={'end'} mt={3} mb={5}>
								<Link href={'/forgot-password'}>
									<Text color={'#1C9DE1'} fontSize="0.9rem">
										Forgot Password?
									</Text>
								</Link>
							</Flex>
							<Flex justifyContent={'center'}>
								<Button
									mt={4}
									mr={8}
									colorScheme="blue"
									isLoading={props.isSubmitting}
									type="submit"
									w={120}
									borderRadius={15}
									py={6}
									fontSize={'20px'}
								>
									Sign In
								</Button>
								<Link href={'/signup'}>
									<Button
										mt={4}
										type="button"
										colorScheme="gray"
										borderRadius={15}
										py={6}
										fontSize={'20px'}
									>
										Create Account
									</Button>
								</Link>
							</Flex>
						</Form>
					)}
				</Formik>
			</LandingFormLayout>
		</>
	);
}
