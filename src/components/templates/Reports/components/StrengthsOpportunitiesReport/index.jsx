import React, { lazy } from 'react';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Row1 = lazy(() => import('./Row1'));
const Row2 = lazy(() => import('./Row2'));
const Row3 = lazy(() => import('./Row3'));
const Row4 = lazy(() => import('./Row4'));

export default function StrenthsOpportunity() {
	const navigate = useNavigate();
	const handleNavigation = (step) => {
		navigate(`/start-plan/strengths-opportunities?step=${step}&from=report`);
	};
	return (
		<>
			<Text fontWeight={'bold'}>
				What have we got to work with and what are our valuation drivers?
			</Text>
			<Grid templateColumns="repeat(4, 350px)" gap={6}>
				<Row1 handleNavigation={handleNavigation} />
			</Grid>
			<Text fontWeight={'bold'}>{`BUSINESS DRIVERS & PROCESSES`}</Text>
			<Grid templateColumns="repeat(5, 278px)" gap={5}>
				<Row2 handleNavigation={handleNavigation} />
				<Row3 handleNavigation={handleNavigation} />
			</Grid>
			<Grid templateColumns="repeat(3, 467px)" mt="5" gap={6}>
				<Row4 handleNavigation={handleNavigation} />
			</Grid>
		</>
	);
}
