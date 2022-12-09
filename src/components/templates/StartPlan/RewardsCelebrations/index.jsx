import {
	Grid,
	GridItem,
	Box,
	Flex,
	Progress,
	Text,
	Heading,
	Switch,
} from '@chakra-ui/react';
import React, { lazy, useEffect, useState, useContext } from 'react';
import { title, overview, introTitle, introduction, parts } from './configs';
import Intros from 'components/ui/start-plan/Intros';
import Forum from 'components/ui/start-plan/Forum';
import { SectionsContext } from 'contexts/SectionsProvider';
import { getSection2 } from './query';
import { UserContext } from 'contexts/UserProvider';
import { getProgressColour } from '../utils';
import { useSearchParams } from 'react-router-dom';
import { getSection1 } from '../QuickStart/query';

const Part1 = lazy(() => import('./components/Part1'));
const Part2 = lazy(() => import('./components/Part2'));
const Part3 = lazy(() => import('./components/Part3'));
const Part4 = lazy(() => import('./components/Part4'));
const Part5 = lazy(() => import('./components/Part5'));
export default function RewardsCelebrations() {
	const [searchParams, setSearchParams] = useSearchParams();
	const queryPage = searchParams.get('page');
	const queryFrom = searchParams.get('report');
	const [page, setPage] = useState(queryPage ?? 1);
	const {
		contextValue: {
			rewardsCelebrations: {
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
	const [intros, setIntros] = useState({
		title,
		subtitle: 'Quarterly Priorities',
		overview,
		intro: introduction,
		isCard1ListFormat: false,
		isCard2ListFormat: false,
	});
	useEffect(() => {
		if (user.company) {
			const loadSection = async () => {
				const planRef = user?.company?.planRef;
				const qsPlanRef = user?.company?.planRefs[0];
				if (qsPlanRef) {
					const {
						section1: { part1 },
					} = await getSection1(planRef);
					if (part1) {
						const answers = part1?.q1?.answers;
						const priorities = answers.filter((p, i) => i < 5);
						setIntros((intros) => ({
							...intros,
							intro: priorities,
							isCard2ListFormat: true,
						}));
					}
				}
				if (planRef) {
					const { _id, section2 } = await getSection2(planRef);
					await setSection('rewardsCelebrations', {
						_id,
						progress,
						totalAnswered,
						...section2,
					});
				}
				// setComments(section1.part1.q1.comments);
			};
			loadSection();
		}
	}, [user]);

	useEffect(() => {}, []);
	useEffect(() => {
		if (queryPage) {
			setPage(queryPage);
			if (queryFrom && queryFrom == 'report') setSearchParams('');
		}
	}, [queryPage]);
	return (
		<>
			<Grid templateColumns="500px 3fr" h="100vh">
				<GridItem w="100%" px="7">
					<br />
					<Intros {...intros} />
					<Box py="8" px="2" minH="30rem">
						<Forum />
					</Box>
				</GridItem>
				<GridItem w="100%" bg="#F1F3F6">
					<br />
					<Box px="5">
						<Box mb="5">
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
								alignItems={'center'}
								pt={'20px'}
								pr={'10px'}
							>
								<Switch
									defaultChecked
									onChange={(e) => {
										setIsShowPlaceholder(e.target.checked);
									}}
								/>
								<Text ml={'10px'}>
									{isShowPlaceholder ? 'Hide hints' : 'Show hints'}
								</Text>
							</Flex>
						</Box>
						<Box>
							<Heading
								px="5"
								py="7"
								fontSize={'17'}
								bg="#F7F9FA"
								display={page == 2 ? 'none' : 'block'}
							>
								{page == 1 && parts.one}
								{page == 3 && parts.two}
								{page == 4 && parts.three}
								{page == 5 && parts.four}
							</Heading>
							{page == 1 && (
								<Part1
									values={part1?.q1?.answers}
									setPage={setPage}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{page == 2 && (
								<Part2
									values={part1?.q2?.answers}
									setPage={setPage}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{page == 3 && (
								<Part3
									values={part2?.q3?.answers}
									setPage={setPage}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{page == 4 && (
								<Part4
									values={part3}
									setPage={setPage}
									isShowPlaceholder={isShowPlaceholder}
								/>
							)}
							{page == 5 && (
								<Part5
									values={part4?.q6?.answers}
									setPage={setPage}
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
