import React, { useContext, lazy } from 'react';
import {
	Box,
	Flex,
	Spacer,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ChakraImage } from 'utils/images';
import { UserContext } from 'contexts/UserProvider';
import { logout } from 'services/auth';
import { useLocation, useNavigate } from 'react-router-dom';

const SectionHeader = lazy(() => import('components/ui/Header/SectionHeader'));
const ReportHeader = lazy(() => import('components/ui/Header/ReportHeader'));

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const {
		contextValue: { user },
		resetState,
	} = useContext(UserContext);

	const defaultPhoto = require('assets/images/default-user-photo.png');
	const photoUrl = user?.photoUrl ? user.photoUrl : defaultPhoto;

	const onLogout = async () => {
		await logout();
		resetState();
		navigate('/login');
	};
	return (
		<>
			<Flex
				px={8}
				py={2}
				borderBottom={'1px solid'}
				borderColor="rgba(0,0,0,0.51)"
				justifyContent={'space-between'}
			>
				<Box cursor={'pointer'} onClick={() => navigate('/home/dashboard')}>
					<ChakraImage
						src={require('assets/images/logo.png')}
						alt="logo.png"
						width="200px"
						height="90px"
						objectFit="contain"
					/>
				</Box>
				{location.pathname === '/start-plan/quick-start' && <SectionHeader />}
				{location.pathname === '/start-plan/rewards-celebrations' && (
					<SectionHeader />
				)}
				{location.pathname === '/start-plan/strengths-opportunities' && (
					<SectionHeader />
				)}
				{location.pathname === '/start-plan/vision-of-success' && (
					<SectionHeader />
				)}
				{location.pathname === '/start-plan/numbers' && <SectionHeader />}
				{location.pathname === '/reports' && <ReportHeader />}
				<Box mt={2}>
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={10}>
							<Avatar name="profile picture" size="lg" src={photoUrl} />
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={() => {
									navigate('/home/profile');
								}}
							>
								<Text textAlign={'center'} w="100%">
									My Profile
								</Text>
							</MenuItem>
							<hr />
							<MenuItem
								onClick={() => {
									navigate('/home/invite-user');
								}}
							>
								<Text textAlign={'center'} w="100%">
									Manage Users
								</Text>
							</MenuItem>
							<hr />
							<MenuItem onClick={onLogout}>
								<Text textAlign={'center'} w="100%">
									Log Out
								</Text>
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			</Flex>
		</>
	);
}
