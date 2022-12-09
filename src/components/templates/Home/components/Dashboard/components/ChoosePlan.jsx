import React, { useContext, useEffect } from 'react';
import { Flex, Box, Spacer, Text, Select, Tooltip } from '@chakra-ui/react';
import { UserContext } from 'contexts/UserProvider';
import { SectionsContext } from 'contexts/SectionsProvider';
import { updateData } from 'services/firestore';
export default function ChoosePlan({}) {
	const {
		contextValue: { user },
		setUser,
	} = useContext(UserContext);
	const { setSection } = useContext(SectionsContext);
	const handleSelectPlan = async (e) => {
		//reset sections state
		setSection('quickStart', {
			progress: 0,
			totalAnswered: 0,
		});
		const planRefIndex = e.target.value;
		const planRef = user.company?.planRefs[planRefIndex];
		await updateData('companies', user.company._id, { planRef });
		setUser({
			...user,
			company: {
				...user.company,
				planRef,
			},
		});
	};

	return (
		<>
			<Box height={'90px'} pt={'30px'} width={'100%'} pl={'60px'} pr={'60px'}>
				<Flex>
					<Text
						fontWeight={'bold'}
						fontSize={'18px'}
						color={'blackAlpha.700'}
						pt={'8px'}
						w="200px"
					>
						Choose your plan
					</Text>
					<Tooltip
						label={
							!user.company.planRefs?.length ? 'Please start a new plan' : ''
						}
						fontSize="lg"
						placement="top"
						bg="blue.300"
					>
						<Box w="100%">
							<Select
								value={user.company?.planRefs?.findIndex(
									(x) => x.id === user.company.planRef.id
								)}
								onChange={(e) => handleSelectPlan(e)}
								placeholder=""
								width={'100%'}
								cursor="pointer"
								textAlign={'center'}
								isDisabled={!user.company.planRefs?.length}
							>
								{user.company?.planRefs?.map((p, i) => (
									<option value={i} key={i}>
										Plan {i + 1}
									</option>
								))}
							</Select>
						</Box>
					</Tooltip>
				</Flex>
			</Box>
		</>
	);
}
