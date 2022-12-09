import { Box, Button, Flex, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

export default function Part1Intro({ setStep }) {
	return (
		<>
			<Heading
				px={'5'}
				py="7"
				fontSize={'20px'}
				fontWeight={'700'}
				bg="#F7F9FA"
				border={'1px solid #E4E5E7'}
			>
				Part 1 – STRENGTHS AND WEAKNESSES
			</Heading>
			<Box p={'4'} bg="white" border={'1px solid #E4E5E7'}>
				<Box pl={'6'} pr={'10'}>
					<Text>
						In this section, we are focusing on skills and abilities you and
						your business bring to the table. What is going to help you jump
						over the competition and where do you need to develop and hone your
						skills and knowledge. Most of us have done a SWOT analysis before,
						but this time as you identify an attribute such as strength, I want
						you to think about why it is important. If you cannot use, improve,
						capitalise, or mitigate the SWOT item, question if it belongs on the
						page.
					</Text>
					<br />
					<Flex my={'49px'} justifyContent="end">
						<Button
							name="submitBtn"
							type="submit"
							w="10rem"
							bgColor="rgba(1,113,187,0.9)"
							borderRadius="20px"
							leftIcon={<ArrowBackIcon boxSize="1.3rem" color={'white'} />}
							value={'Previous'}
							onClick={() => {}}
						>
							<Text color={'white'} fontSize="1.1rem" fontWeight="bold">
								Previous
							</Text>
						</Button>
						<Box mx={'5'}>
							<Button
								name="submitBtn"
								type="submit"
								w="10rem"
								bgColor="rgba(1,113,187,0.9)"
								borderRadius="20px"
								rightIcon={
									<ArrowForwardIcon boxSize="1.3rem" color={'white'} />
								}
								value={'Continue'}
								onClick={() => {
									setStep(1.2);
								}}
							>
								<Text color={'white'} fontSize="1.1rem" fontWeight="bold">
									Continue
								</Text>
							</Button>
						</Box>
					</Flex>
				</Box>
			</Box>
		</>
	);
}
