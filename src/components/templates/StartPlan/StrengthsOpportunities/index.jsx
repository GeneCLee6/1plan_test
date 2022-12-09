import {
	Box,
	Grid,
	GridItem,
	Flex,
	Progress,
	Text,
	Switch,
} from '@chakra-ui/react';
import React, { useState, useContext, useEffect } from 'react';
import * as c from './components';
import { getSection3 } from './query';
import { introduction, overview, subtitle, title } from './config';
import { SectionsContext } from 'contexts/SectionsProvider';
import { UserContext } from 'contexts/UserProvider';
import { getProgressColour } from '../utils';
import { useSearchParams } from 'react-router-dom';

export default function StrengthsOpportunities() {
	const [searchParams, setSearchParams] = useSearchParams();
	const queryStep = searchParams.get('step');
	const queryFrom = searchParams.get('report');
	const [step, setStep] = useState(queryStep ?? 1.1);
	const {
		contextValue: {
			strengthsOpportunities: {
				progress,
				totalAnswered,
				part1,
				part2,
				part3,
				part4,
			},
		},
		setSection,
	} = useContext(SectionsContext);
	const [isShowPlaceholder, setIsShowPlaceholder] = useState(true);
	const {
		contextValue: { user },
	} = useContext(UserContext);
	useEffect(() => {
		if (user.company) {
			const loadSection = async () => {
				const planRef = user?.company?.planRef;
				if (planRef) {
					const { _id, section3 } = await getSection3(planRef);
					await setSection('strengthsOpportunities', {
						_id,
						progress,
						totalAnswered,
						...section3,
					});
				}
				// setComments(section1.part1.q1.comments);
			};
			loadSection();
		}
	}, [user]);

	useEffect(() => {
		if (queryStep) {
			setStep(queryStep);
			if (queryFrom && queryFrom == 'report') setSearchParams('');
		}
	}, [queryStep]);
	return (
		<>
			<Grid templateColumns={'500px 3fr'} h="100vh">
				<GridItem w={'100'} px="7" border={'1px solid rgba(0,0,0,0.15)'}>
					<br />
					<c.Intros
						title={title}
						subtitle={subtitle}
						overview={overview}
						intro={introduction}
						isCard2ListFormat={true}
					/>
					<Box py={'8'} px={'2'} minH="30rem">
						<c.Forum />
					</Box>
				</GridItem>
				<GridItem w={'100%'} bg="#F1F3F6">
					<br />
					<Box px={'5'}>
						<Box mb={'5'}>
							<Flex w="100%" alignItems={'center'}>
								<Box bgColor="#F5F5F5" w="100%">
									<Progress
										width={`${progress}%`}
										height={'8px'}
										bgColor={getProgressColour(progress)}
										borderRadius={'6px'}
									/>
								</Box>
								<Text
									ml="5"
									color={getProgressColour(progress)}
									fontWeight="bold"
								>
									{progress}%
								</Text>
							</Flex>
							<Flex
								justifyContent={'end'}
								alignItems="center"
								pt="20px"
								pr="10px"
							>
								<Switch
									defaultChecked
									onChange={(e) => {
										setIsShowPlaceholder(e.target.checked);
									}}
								/>
								<Text ml="10px">
									{isShowPlaceholder ? 'Hide hints' : 'Show hints'}
								</Text>
							</Flex>
						</Box>
						<Box minH={'30rem'}>
							{step == 1.1 && (
								<c.Part1Intro
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 1.2 && (
								<c.Q1
									setStep={setStep}
									values={part1?.q1?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 2.1 && (
								<c.Part2Intro
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 2.2 && (
								<c.Q2
									setStep={setStep}
									values={part2?.q2?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.1 && (
								<c.Part3Intro
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.2 && (
								<c.Q3
									setStep={setStep}
									values={part3?.q3?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.3 && (
								<c.Q4
									setStep={setStep}
									values={part3?.q4?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.4 && (
								<c.Q5
									setStep={setStep}
									values={part3?.q5?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.5 && (
								<c.Q6
									setStep={setStep}
									values={part3?.q6?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.6 && (
								<c.Q7
									setStep={setStep}
									values={part3?.q7?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.7 && (
								<c.Q8
									setStep={setStep}
									values={part3?.q8?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.8 && (
								<c.Q9
									setStep={setStep}
									values={part3?.q9?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.9 && (
								<c.Q10
									setStep={setStep}
									values={part3?.q10?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.11 && (
								<c.Q11
									setStep={setStep}
									values={part3?.q11?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.12 && (
								<c.Q12
									setStep={setStep}
									values={part3?.q12?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.1 && (
								<c.Part4Intro
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.2 && (
								<c.Q13
									setStep={setStep}
									values={part4?.q13?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.3 && (
								<c.Q14
									setStep={setStep}
									values={part4?.q14?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.4 && (
								<c.Q15
									setStep={setStep}
									values={part4?.q15?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.5 && (
								<c.Q16
									setStep={setStep}
									values={part4?.q16?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.6 && (
								<c.Q17
									setStep={setStep}
									values={part4?.q17?.answers}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
						</Box>
					</Box>
				</GridItem>
			</Grid>
		</>
	);
}
