import React from 'react';
import {
	Spinner,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	Flex,
} from '@chakra-ui/react';
export default function Loading() {
	return (
		<>
			<Modal isOpen={true}>
				<ModalOverlay />
				<ModalContent
					style={{
						backgroundColor: 'transparent',
						boxShadow: 'none',
					}}
				>
					<ModalBody>
						<Flex justifyContent="center" alignItems={'center'} h={'100%'}>
							<Spinner
								thickness="4px"
								speed="0.65s"
								emptyColor="gray.200"
								color="blue.500"
								size="xl"
							/>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
