import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Flex,
	Link,
	Button,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export default function MessagePopup({ isOpen, onClose }) {
	const navigate = useNavigate();
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
				<ModalOverlay />
				<ModalContent>
					<Flex alignItems={'start'} pl="5">
						<CheckCircleIcon boxSize={5} mt="23px" color={'green'} />
						<Flex direction="column">
							<ModalHeader>Congulations!</ModalHeader>
							<ModalBody>
								You have completed the last section of your Plan.
							</ModalBody>
						</Flex>
					</Flex>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							borderRadius={0}
							onClick={onClose}
						>
							Continue
						</Button>

						<Button
							colorScheme="blue"
							borderRadius={0}
							onClick={() => navigate('/home/dashboard')}
						>
							Finish
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
