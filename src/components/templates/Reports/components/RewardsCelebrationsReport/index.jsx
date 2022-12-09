import React, { lazy } from 'react';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Row1 = lazy(() => import('./Row1'));
const Row2 = lazy(() => import('./Row2'));
const Row3 = lazy(() => import('./Row3'));

export default function RewardsCelebration() {
	const navigate = useNavigate();
	const handleNavigation = (page) => {
		navigate(`/start-plan/rewards-celebrations?page=${page}`);
	};
	const handleNavigationToVision = (step) => {
		navigate(`/start-plan/vision-of-success?step=${step}&from=report`);
	};
	return (
		<>
			<Text fontWeight={'bold'}>How do we measure our success?</Text>
			<Grid templateColumns="550px 300px 550px" gap={6}>
				<Row1 handleNavigation={handleNavigation} />
				<Row2 handleNavigation={handleNavigation} />
				<Row3 handleNavigationToVision={handleNavigationToVision} />
			</Grid>
		</>
	);
}
