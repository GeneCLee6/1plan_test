import React, { useState, useContext, useEffect, lazy } from 'react';
import {
	Box,
	Flex,
	Button,
	Text,
	Select,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Input,
} from '@chakra-ui/react';
import { MdCancel } from 'react-icons/md';
import { DEFAULT_BORDER_RADIUS } from '../config';
import { UserContext } from 'contexts/UserProvider';
import { updateData, deleteDataField } from 'services/firestore';

const RoleSelect = lazy(() => import('./RoleSelect'));
export default function InviteUser() {
	const {
		contextValue: { user },
	} = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const [roles, setRoles] = useState([]);

	console.log(roles);
	const handleChangeRole = async (selectedRole, index) => {
		const path = `users.${index}.role`;
		await updateData('companies', user.company._id, {
			[path]: selectedRole,
		});
		const newRoles = [...roles];
		newRoles.forEach((r, i) => {
			if (i === index) r.role = selectedRole;
		});
		setRoles(newRoles);
	};
	const handleRemoveRole = async (index) => {
		await deleteDataField('companies', user.company._id, `users.${index}`);

		const newRoles = [...roles];
		newRoles.splice(index, 1);
		setRoles(newRoles);
	};
	const handleInvite = async () => {
		const newIndex = roles.length;
		const path = `users.${newIndex}`;
		await updateData('companies', user.company._id, {
			[path]: {
				email,
				status: 'Accepted',
				role,
			},
		});
		setRoles((prevRoles) => [
			...prevRoles,
			{ email, status: 'Accepted', role },
		]);
	};
	useEffect(() => {
		const loadUsers = async () => {
			const { company } = user;
			if (company) {
				const { users } = company;
				if (users)
					setRoles([
						{ email: user.email, status: 'Accepted', role: 'Standard User' },
						...Object.values(users),
					]);
			}
		};
		loadUsers();
	}, [user]);
	return (
		<>
			<Box
				bg="white"
				borderRadius={DEFAULT_BORDER_RADIUS}
				px="40px"
				pt="60px"
				h="100%"
			>
				<Flex justifyContent={'space-between'} alignItems="center">
					<Text fontSize={'1.4rem'} fontWeight="600" w="150px">
						Invite a user
					</Text>
					<Input
						variant="outline"
						mx="10px"
						w="200px"
						placeholder="email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<RoleSelect
						placeholder="Select Role"
						mr="100px"
						w="200px"
						value={role}
						onChange={(e) => setRole(e.target.value)}
					/>
					<Button
						colorScheme="blue"
						size="lg"
						borderRadius={'15px'}
						w="144px"
						h="56px"
						fontSize={'1.4rem'}
						onClick={() => handleInvite()}
					>
						Invite
					</Button>
				</Flex>
				<TableContainer
					mt="80px"
					border="1px solid rgba(0,0,0,0.07)"
					borderRadius={DEFAULT_BORDER_RADIUS}
					px="30px"
					py="40px"
				>
					<Table variant="simple" size="sm">
						<Thead>
							<Tr>
								{['Email', 'Authorization', 'Status', 'Action'].map(
									(header, i) => (
										<Th
											key={i}
											textAlign={'center'}
											textTransform={'capitalize'}
										>
											{header}
										</Th>
									)
								)}
							</Tr>
						</Thead>
						<Tbody>
							{roles.map((r, i) => (
								<Tr key={i}>
									<Td>{r.email}</Td>
									<Td>
										<Flex justifyContent={'center'}>
											<Box ml="100px">
												<RoleSelect
													mr="100px"
													w="200px"
													value={r.role}
													onChange={(e) => handleChangeRole(e.target.value, i)}
												/>
											</Box>
										</Flex>
									</Td>
									<Td>{r.status}</Td>

									<Td>
										<Button
											boxShadow="lg"
											leftIcon={<MdCancel color="red" />}
											colorScheme="white"
											variant="solid"
											color="black"
											onClick={() => handleRemoveRole(i)}
										>
											Remove
										</Button>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
