import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ChakraImage } from 'utils/images';

export default function LandingFormLayout({ children }) {
	return (
		<>
			<Box px={10} py={5} h="100%">
				<Flex justifyContent={'center'}>
					<ChakraImage
						src={require('assets/images/logo.png')}
						alt="logo.png"
						width="200px"
						height="200px"
						objectFit="contain"
					/>
				</Flex>
				{children}
				<Flex
					justifyContent={'center'}
					alignItems={'center'}
					direction={'column'}
					h="70px"
					mt={10}
					pb={5}
				>
					<ChakraImage
						src={require('assets/images/logo-grey.png')}
						alt="logo.png"
						width="120px"
						height="150px"
						objectFit="contain"
					/>
					<Text fontSize={'0.7rem'}>
						© Copyright {new Date().getFullYear()} 1Plan Pty Ltd. All Rights
						Reserved.
					</Text>
				</Flex>
			</Box>
		</>
	);
}
