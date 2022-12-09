import {
	Box,
	Grid,
	GridItem,
	Flex,
	Progress,
	Text,
	Switch,
} from '@chakra-ui/react';
import { SectionsContext } from 'contexts/SectionsProvider';
import { UserContext } from 'contexts/UserProvider';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import * as c from './components';
import { introduction, overview, subtitle, title } from './configs';
import { getSection4 } from './query';
import { getProgressColour } from '../utils';
import { useSearchParams } from 'react-router-dom';

export default function VisionOfSuccess() {
	const [searchParams, setSearchParams] = useSearchParams();
	const queryStep = searchParams.get('step');
	const queryFrom = searchParams.get('report');
	const [step, setStep] = useState(queryStep ?? 1.1);

	const {
		contextValue: {
			visionOfSuccess: { progress, totalAnswered, part1, part2, part3, part4 },
		},
		setSection,
	} = useContext(SectionsContext);
	const {
		contextValue: { user },
	} = useContext(UserContext);
	const [isShowPlaceholder, setIsShowPlaceholder] = useState(true);
	useEffect(() => {
		if (user.company) {
			const loadSection = async () => {
				const planRef = user?.company?.planRef;
				if (planRef) {
					const { _id, section4 } = await getSection4(planRef);
					await setSection('visionOfSuccess', {
						_id,
						progress,
						totalAnswered,
						...section4,
					});
				}
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
									fontWeight={'bold'}
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
									{`${isShowPlaceholder ? 'Hide' : 'Show'} hints`}
								</Text>
							</Flex>
						</Box>
						<Box minH={'30rem'}>
							{step == 1.1 && <c.Part1Page1 setStep={setStep} />}
							{step == 1.2 && (
								<c.Part1Page2
									values={part1?.q1?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 1.3 && (
								<c.Part1Page3
									value1={part1?.q2?.answers}
									value2={part1?.q3?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 1.4 && (
								<c.Part1Page4
									values={part1?.q4?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 1.5 && (
								<c.Part1Page5
									values={part1?.q5?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 2.6 && (
								<c.Part2Page6
									values={part2?.q6?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 2.7 && (
								<c.Part2Page7
									values={part2?.q7?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.8 && <c.Part3Page8 setStep={setStep} />}
							{step == 3.9 && (
								<c.Part3Page9
									values={part3?.q8a?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == '3.10' && (
								<c.Part3Page10
									values={part3?.q8b?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 3.11 && (
								<c.Part3Page11
									values={part3?.q8c?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.12 && <c.Part4Page12 setStep={setStep} />}
							{step == 4.13 && (
								<c.Part4Page13
									values={part4?.q9?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.14 && (
								<c.Part4Page14
									values={part4?.q10?.answers}
									setStep={setStep}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{step == 4.15 && (
								<c.Part4Page15
									values={part4?.q11?.answers}
									setStep={setStep}
									s
								/>
							)}
						</Box>
					</Box>
				</GridItem>
			</Grid>
		</>
	);
}
