import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import {
	Sidebar,
	Dashboard,
	InviteUser,
	CompanyInfo,
	Profile,
} from './components';

export default function Home() {
	const location = useLocation();
	const [isClickStartNewPlan, setIsClickStartNewPlan] = useState(false);
	const [isStartPlan, setIsStartPlan] = useState(false);

	return (
		<>
			<br />
			<Grid templateColumns="1fr 3fr" h="100vh">
				<GridItem w="100%">
					<Sidebar
						setIsClickStartNewPlan={setIsClickStartNewPlan}
						setIsStartPlan={setIsStartPlan}
					/>
				</GridItem>
				<GridItem w="100%">
					<Box bgColor="#D9D9D9" h="100%" p={4}>
						{location.pathname === '/home/dashboard' && (
							<Dashboard
								isClickStartNewPlan={isClickStartNewPlan}
								setIsClickStartNewPlan={setIsClickStartNewPlan}
								setIsStartPlan={setIsStartPlan}
								isStartPlan={isStartPlan}
							/>
						)}
						{['/home/company-info', '/home/company-info/create'].includes(
							location.pathname
						) && (
							<CompanyInfo
								isCreate={location.pathname === '/home/company-info/create'}
							/>
						)}
						{location.pathname === '/home/invite-user' && <InviteUser />}
						{location.pathname === '/home/profile' && <Profile />}
					</Box>
				</GridItem>
			</Grid>
		</>
	);
}
