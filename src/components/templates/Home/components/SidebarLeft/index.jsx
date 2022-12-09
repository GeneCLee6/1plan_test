import React, { useContext, useState } from 'react';
import {
	Box,
	Flex,
	Text,
	Heading,
	Icon,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Tooltip,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { goToSectionTabs, actionPlanButtons, navigationTabs } from './configs';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from 'contexts/UserProvider';
import { SnackbarContext } from 'contexts/SnackbarProvider';
import {
	DEFAULT_BORDER,
	DEFAULT_BORDER_RADIUS,
	DEFAULT_BOX_SHADOW,
} from '../config';
import { createDocReference, updateData } from 'services/firestore';
import { useSectionProgressRows } from '../config';

export default function SidebarLeft({
	setIsClickStartNewPlan,
	setIsStartPlan,
}) {
	const location = useLocation();
	const navigate = useNavigate();
	const {
		contextValue: { user },
		setUser,
	} = useContext(UserContext);
	const {
		contextValue: { styles },
		updateSnackbarStates,
	} = useContext(SnackbarContext);

	const [organisation, setOrganisation] = useState(user?.company);
	const sectionProgressRows = useSectionProgressRows();
	const handleSelectOrganisation = async (company) => {
		const companyRef = createDocReference(`companies/${company._id}`);

		await updateData('users', user._id, { companyRef });
		setUser({
			...user,
			companyRef,
			company,
		});
		setOrganisation(company);
	};

	const isBusinessInfoFinished =
		Object.keys(user.company).length > 2 &&
		user.company.address !== '' &&
		user.company.country !== '' &&
		user.company.city !== '' &&
		user.company.industryCode != '' &&
		user.company.logoUrl != '' &&
		user.company.logoUrl != undefined &&
		user.company.zipCode != '';

	return (
		<>
			<Flex alignItems={'start'} h="100%" pl={3} pr={3} direction="column">
				<Menu placement="bottom">
					<MenuButton
						w="250px"
						minH="40px"
						as={Button}
						rightIcon={<ChevronDownIcon />}
						ml={4}
					>
						<Text w="100%" whiteSpace={'normal'}>
							{organisation.businessName}
						</Text>
					</MenuButton>
					<MenuList>
						{user?.companies?.map((c, i) => (
							<React.Fragment key={i}>
								<MenuItem onClick={() => handleSelectOrganisation(c)}>
									<Text w="250px" textAlign={'center'} whiteSpace={'normal'}>
										{c.businessName}
									</Text>
								</MenuItem>
								<hr />
							</React.Fragment>
						))}

						<MenuItem onClick={() => navigate('/home/company-info/create')}>
							<Flex w="100%" justifyContent={'center'}>
								<Box bgColor="#0273C2" color="white" p="2" borderRadius="5px">
									Create Organisation
								</Box>
							</Flex>
						</MenuItem>
					</MenuList>
				</Menu>
				<Box mt={4} pl={6}>
					{navigationTabs.map((t, i) => (
						<Flex
							key={i}
							mb={2}
							cursor="pointer"
							color={
								t.route.includes(location.pathname) ? '#0273C2' : '#6f6e6f'
							}
							onClick={() => {
								if (t.route[0] == '/home/dashboard') {
									setIsClickStartNewPlan(false);
									setIsStartPlan(false);
								}
								navigate(t.route[0]);
							}}
						>
							{console.log(t)}
							<Icon as={t.icon} mr={5} boxSize={8} />
							<Text>{t.label}</Text>
						</Flex>
					))}
				</Box>
				<Box
					textAlign={'start'}
					pl={4}
					pr={4}
					mt={5}
					w="100%"
					fontSize="1.1rem"
					color="#0273C2"
				>
					{actionPlanButtons.map((b, i) => (
						<Flex
							border="1px solid grey"
							mb={2}
							borderRadius={'8px'}
							justifyContent="space-between"
							alignItems={'center'}
							key={i}
							p={1}
							w={'100%'}
							cursor="pointer"
							onClick={() => {
								if (b.label === 'Start New Plan') {
									if (isBusinessInfoFinished) {
										setIsClickStartNewPlan(true);
										navigate('/home/dashboard');
									} else {
										setIsClickStartNewPlan(false);
										setIsStartPlan(false);
										navigate('/home/company-info');
										updateSnackbarStates({
											show: true,
											message:
												'Please complete business information before start new plan',
											styles: {
												...styles,
												bgColor: 'orange',
											},
										});
									}
								} else if (b.label === 'Go To Plan') {
									navigate('/reports');
								}
							}}
						>
							<Text fontSize={'24px'}>{b.label}</Text>
							<ChevronRightIcon
								border="3px solid #217FC4"
								color="#217FC4"
								borderRadius={20}
								boxSize="8"
							/>
						</Flex>
					))}
				</Box>
				<br />

				<Box
					alignSelf={'md'}
					border={DEFAULT_BORDER}
					borderRadius={DEFAULT_BORDER_RADIUS}
					boxShadow={DEFAULT_BOX_SHADOW}
					px={3}
					py={5}
					w={'100%'}
				>
					<Heading fontSize={'18px'} w="100%" fontWeight={'600'}>
						GO TO SECTION
					</Heading>
					<Box w={'100%'} justifyContent={'center'} my={3} px={2}>
						<hr style={{ border: '0.5px solid grey' }} />
					</Box>
					{goToSectionTabs.map((s, i) => (
						<Box
							key={i}
							onClick={() => {
								if (sectionProgressRows[i].progress == 100) navigate(s.route);
							}}
						>
							<Tooltip
								label={
									sectionProgressRows[i].progress != 100
										? `Please finish ${sectionProgressRows[i].section} section first`
										: ''
								}
								fontSize="lg"
								placement="top"
								bg="blue.300"
							>
								<Flex mb={2} cursor="pointer">
									<Icon as={s.icon} mr={5} boxSize={8} color="#6f6e6f" />
									<Text>{s.label}</Text>
								</Flex>
							</Tooltip>
						</Box>
					))}
				</Box>
			</Flex>
		</>
	);
}
