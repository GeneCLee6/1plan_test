import React, { lazy, useEffect, useRef, useState } from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { DEFAULT_BORDER_RADIUS } from '../config';

const Stats = lazy(() => import('./components/Stats'));
const SectionsProgress = lazy(() => import('./components/SectionsProgress'));
const ChoosePlan = lazy(() => import('./components/ChoosePlan'));
const PlanSettings = lazy(() => import('./components/PlanSettings'));

export default function Dashboard({
	isClickStartNewPlan,
	setIsClickStartNewPlan,
	isStartPlan,
	setIsStartPlan,
}) {
	const mounted = useRef(false);

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true;
			return;
		}
		return () => {
			if (mounted.current) {
				setIsClickStartNewPlan(false);
				setIsStartPlan(false);
			}
		};
	}, []);

	return (
		<>
			{!isStartPlan ? (
				<Box
					bgColor="#FFFFFF"
					h="100%"
					p={4}
					borderRadius={DEFAULT_BORDER_RADIUS}
				>
					<Stats />
					<Flex direction={'column'} alignItems={'center'}>
						{!isClickStartNewPlan ? (
							<>
								<ChoosePlan />
								<SectionsProgress />
							</>
						) : (
							<>
								<Button
									w="50%"
									mt={'100px'}
									bgColor="rgba(1,113,187,0.9)"
									borderRadius="10px"
									value={'Continue'}
									onClick={() => setIsStartPlan(true)}
								>
									<Text color={'white'} fontSize="1.1rem">
										Start your 1 PLAN
									</Text>
								</Button>
							</>
						)}
					</Flex>
				</Box>
			) : (
				<PlanSettings />
			)}
		</>
	);
}
