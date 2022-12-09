import React, { useContext, useEffect } from 'react';
import {
	Box,
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Text,
	Progress,
	Flex,
	Tooltip,
	Button,
	Link,
} from '@chakra-ui/react';
import { useSectionProgressRows } from '../../config';
import {
	DEFAULT_BORDER,
	DEFAULT_BORDER_RADIUS,
	DEFAULT_BOX_SHADOW,
} from '../../config';
import { UserContext } from 'contexts/UserProvider';
import { useNavigate } from 'react-router-dom';
export default function SectionsProgress() {
	const navigate = useNavigate();
	const {
		contextValue: { user },
	} = useContext(UserContext);
	const sectionProgressRows = useSectionProgressRows();

	return (
		<>
			<Box
				alignSelf={'md'}
				borderRadius={DEFAULT_BORDER_RADIUS}
				border={DEFAULT_BORDER}
				p={'5'}
				w={'927px'}
				h={'100%'}
			>
				<TableContainer>
					<Table variant="simple">
						<Thead backgroundColor={'#EBEBEB'}>
							<Tr>
								<Th>Section</Th>
								<Th>Status</Th>
								<Th>Progress</Th>
							</Tr>
						</Thead>
						<Tbody>
							{sectionProgressRows.map((s, i) => (
								<Tr key={i}>
									<Td textAlign={'center'} height={'37px'} pl={0}>
										<Tooltip
											label={
												!user.company.planRefs?.length
													? 'Please start a new plan'
													: !s.isEnable &&
													  s.route == '/start-plan/rewards-celebrations'
													? 'Please start quick start section first.'
													: ''
											}
											fontSize="lg"
											placement="top"
											bg="blue.300"
										>
											<Box>
												<Button
													backgroundColor={'#0273C2'}
													width={'205px'}
													height={'37px'}
													borderRadius={'15px'}
													isDisabled={
														!user.company.planRefs?.length || !s.isEnable
													}
													onClick={() => {
														if (s.isEnable) navigate(s.route);
													}}
												>
													<Text color={'#FFF'} fontSize={'14px'}>
														{s.section}
													</Text>
												</Button>
											</Box>
										</Tooltip>
									</Td>
									<Td>
										<Text fontWeight={700} fontSize={'14px'} color={s.colour}>
											{s.status}
										</Text>
									</Td>
									<Td width={'500px'}>
										<Flex alignItems={'center'}>
											<Box bgColor="#F5F5F5" w="100%">
												<Progress
													width={`${s.progress}%`}
													height={'8px'}
													bgColor={s.colour}
													borderRadius={'6px'}
												/>
											</Box>
											<Text
												ml={5}
												fontWeight={'bold'}
												fontSize={'12px'}
												color={'#8C8C8C'}
											>
												{s.progress}%
											</Text>
										</Flex>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
