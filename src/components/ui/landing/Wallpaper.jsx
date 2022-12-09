import React from 'react';
import { Heading, Flex, Box } from '@chakra-ui/react';
import { ChakraImage } from 'utils/images';

export default function Wallpaper() {
	return (
		<>
			<Flex
				direction="column"
				alignItems={'center'}
				h={'100vh'}
				bg="#F7F9FA"
				px={5}
				py={'70px'}
			>
				<Heading textAlign={'center'} color="gray" fontWeight={'400'} my={5}>
					Effortless Business Planning
				</Heading>
				<Box h="400px" w="100%" position="relative">
					<ChakraImage
						src={require('assets/images/dashboard.png')}
						alt="logo.png"
						layout="fill"
						object-fill="contian"
						width="100%"
					/>
				</Box>
			</Flex>
		</>
	);
}
