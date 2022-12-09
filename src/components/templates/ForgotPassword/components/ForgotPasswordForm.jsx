import {
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Flex,
	Link,
	Text,
	Heading,
} from '@chakra-ui/react';
import React, { lazy } from 'react';
import { Formik, Form, Field } from 'formik';
import { validation } from '../utils/validations';

const LandingFormLayout = lazy(() =>
	import('components/ui/landing/LandingFormLayout')
);
export default function ForgotPasswordForm() {
	return (
		<>
			<LandingFormLayout>
				<Heading
					color="gray"
					fontWeight={400}
					fontSize={'30px'}
					textAlign={'center'}
					mb={5}
				>
					Forgot your password?
				</Heading>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={(values, actions) => {
						console.log(values);
						actions.setSubmitting(false);
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
							<Flex justifyContent={'center'} mt={3} mb={5}>
								<Button
									mt={4}
									mr={8}
									colorScheme="blue"
									isLoading={props.isSubmitting}
									type="submit"
									w={'100%'}
									py={7}
									borderRadius={15}
									fontSize={'20px'}
								>
									Send me instructions
								</Button>
							</Flex>
							<Flex justifyContent={'center'} direction="column">
								<Link href={'/login'}>
									<Button
										mt={4}
										type="button"
										colorScheme="gray"
										variant={'ghost'}
										fontSize="0.9rem"
										color={'#1C9DE1'}
									>
										Sign in
									</Button>
								</Link>
								<Link href={'/signup'}>
									<Button
										type="button"
										colorScheme="gray"
										variant={'ghost'}
										fontSize="0.9rem"
										color={'#1C9DE1'}
									>
										Sign up
									</Button>
								</Link>
							</Flex>
						</Form>
					)}
				</Formik>
				<br />
			</LandingFormLayout>
		</>
	);
}
