import {
	Flex,
	Center,
	Box,
	Icon,
	Text,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Button,
} from '@chakra-ui/react';
import { TriangleDownIcon, DownloadIcon } from '@chakra-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { FaPrint } from 'react-icons/fa';
import { ReportContext } from 'contexts/ReportProvider';
import useIsAllSectionsComplete from 'hooks/useIsAllSectionsComplete';
import { SnackbarContext } from 'contexts/SnackbarProvider';
import { UserContext } from 'contexts/UserProvider';
import { getDocByRef } from 'services/firestore';

export default function ReportHeader() {
	const {
		contextValue: { styles: snackbarStyles },
		updateSnackbarStates,
	} = useContext(SnackbarContext);
	const navigate = useNavigate();
	const isAllSectionsComplete = useIsAllSectionsComplete();
	const {
		contextValue: { isShowPrompts },
		setIsShowPrompts,
	} = useContext(ReportContext);

	const onTogglePrompts = () => {
		setIsShowPrompts(!isShowPrompts);
	};
	// const onGoToPDF = (format) => {
	//   navigate(`/pdf?format=${format}`);
	// };

	const onGoToPDF = (format) => {
		if (isAllSectionsComplete) navigate(`/pdf?format=${format}`);
		else {
			updateSnackbarStates({
				show: true,
				message: 'Please complete all sections first',
				styles: {
					...snackbarStyles,
					backgroundColor: 'red',
				},
			});
		}
	};

	// Check for progress and determine if prompts should be shown
	const {
		contextValue: { user },
	} = useContext(UserContext);
	const [hasZeroProgress, setHasZeroProgress] = useState(false);
	useEffect(() => {
		if (!user.company?.planRef) return;
		(async () => {
			const planDoc = await getDocByRef(user.company.planRef);
			const sectionProgresses = await Promise.all(
				planDoc.planSectionRefs.map(async (r, i) => {
					const section = await getDocByRef(r);
					const progress = section[`section${i + 1}`].progress;
					return progress ? progress : 0;
				}),
			);

			setHasZeroProgress(sectionProgresses.every((p) => p === 0));
		})();
	}, [user.company?.planRef]);

	useEffect(() => {
		setIsShowPrompts(hasZeroProgress);
	}, [hasZeroProgress]);

	return (
		<>
			<Center ml={'81px'} mr={'81px'} width={'60%'}>
				<Flex
					width={'100%'}
					justifyContent={'space-evenly'}
					alignItems={'center'}
				>
					<Box
						border={'1px solid #D9D9D9'}
						p={'2'}
						w={'140px'}
						borderRadius={'8px'}
						cursor={'pointer'}
						onClick={() => {
							navigate('/home/dashboard');
						}}
					>
						<Flex justifyContent={'center'}>
							<Icon as={AiOutlineHome} w={6} h={6}></Icon>
							<Text ml={2} fontSize={'16px'}>
								Dashboard
							</Text>
						</Flex>
					</Box>
					<Box w={'140px'} cursor={'pointer'}>
						<Menu>
							<MenuButton
								border={'1px solid #D9D9D9'}
								p={2}
								w={'140px'}
								borderRadius={'8px'}
								icon={<FaPrint />}
							>
								<Flex justifyContent={'space-evenly'} alignItems={'center'}>
									<FaPrint size={'20px'} />
									<Text fontSize={'16px'}>Print</Text>
									<TriangleDownIcon />
								</Flex>
							</MenuButton>
							<MenuList mt={2}>
								<MenuItem
									onClick={() => {
										onGoToPDF('a3');
									}}
								>
									<Text textAlign={'center'} w="100%">
										<DownloadIcon />
										A3 Page Print
									</Text>
								</MenuItem>
								<hr />
								<MenuItem onClick={() => {}}>
									<Text textAlign={'center'} w="100%">
										<DownloadIcon />
										A4 Page Print
									</Text>
								</MenuItem>
							</MenuList>
						</Menu>
					</Box>
					<Box
						border={'1px solid #D9D9D9'}
						p={'2'}
						w={'140px'}
						borderRadius={'8px'}
						cursor={'pointer'}
						onClick={() => onTogglePrompts()}
					>
						<Flex justifyContent={'center'}>
							<Text fontSize={'16px'}>
								{isShowPrompts ? 'Hide' : 'Show'} Prompts
							</Text>
						</Flex>
					</Box>
				</Flex>
			</Center>
		</>
	);
}
