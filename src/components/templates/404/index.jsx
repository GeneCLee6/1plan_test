import React from 'react';
import { Flex } from '@chakra-ui/react';

export default function Error404() {
	return (
		<>
			<Flex
				bgColor={'black'}
				h="100vh"
				textColor={'white'}
				fontSize="1.8rem"
				justifyContent="center"
				alignItems={'center'}
			>
				Error 404 | The page is not found
			</Flex>
		</>
	);
}
