import React, { useState, useContext } from 'react';
import {
	Avatar,
	Flex,
	Button,
	Text,
	Input,
	InputRightElement,
	InputGroup,
	List,
	ListItem,
	Grid,
	GridItem,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { UserContext } from 'contexts/UserProvider';

export default function Forum() {
	const {
		contextValue: { user },
	} = useContext(UserContext);
	const [comments, setComments] = useState([
		// {
		// 	profilePic: 'https://bit.ly/dan-abramov',
		// 	senderName: 'Andrew Koch',
		// 	createdAt: '2minute ago',
		// 	message: "That's good.",
		// },
	]);

	const addNewComment = ({ newMessage }) => {
		const comment = {
			profilePic: user.photoUrl,
			senderName: `${user.firstName} ${user.lastName}`,
			createdAt: '0 second ago',
			message: newMessage,
		};
		setComments([...comments, comment]);
	};

	return (
		<>
			<Flex border="1px solid #E6E6E6" alignItems={'center'} p="3">
				<Avatar src={user.photoUrl} mr="3" />
				<Formik
					initialValues={{ newMessage: '' }}
					onSubmit={(values, actions) => {
						addNewComment({ ...values });
						actions.setSubmitting(false);
						actions.resetForm();
					}}
				>
					{(props) => (
						<Form>
							<Field name="newMessage">
								{({ field, form }) => (
									<InputGroup size="lg">
										<Input
											{...field}
											id="newMessage"
											variant="outline"
											type="text"
											placeholder="Add a comment"
											pr="120px"
											border="0"
										/>
										<InputRightElement w="100px" px="2" py="4">
											<Button
												isLoading={props.isSubmitting}
												type="submit"
												w="100%"
												bgColor={'rgba(1,113,187,0.9)'}
											>
												<Text color={'white'}>Post</Text>
											</Button>
										</InputRightElement>
									</InputGroup>
								)}
							</Field>
						</Form>
					)}
				</Formik>
			</Flex>

			<Text my="3">
				{comments.length} comment{comments.length > 1 ? 's' : ''}
			</Text>
			<List spacing={3}>
				{comments.length &&
					comments.map((c, i) => (
						<ListItem key={i}>
							<Grid templateColumns=".5fr 3fr" pl="3">
								<GridItem w="100%">
									<Avatar name="Kent Dodds" src={c.profilePic} />
								</GridItem>
								<GridItem w="100%" pt="2">
									<Flex direction={'column'}>
										<Flex alignItems={'center'}>
											<Text mr="5" fontWeight={'500'}>
												{c.senderName}
											</Text>
											<Text fontSize={'0.8rem'}>{c.createdAt}</Text>
										</Flex>
										<Text mt="5" pb="2" borderBottom={'1px solid grey'}>
											{c.message}
										</Text>
									</Flex>
								</GridItem>
							</Grid>
						</ListItem>
					))}
			</List>
		</>
	);
}
