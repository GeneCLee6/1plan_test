import React from 'react';
import { Text, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { STEP_BUTTON_PROPS } from './config';

export default function ContinueStepButton({ isSubmitting }) {
	return (
		<>
			<Button
				{...STEP_BUTTON_PROPS}
				isLoading={isSubmitting}
				rightIcon={<ArrowForwardIcon boxSize="1.3rem" color={'white'} />}
				value={'Continue'}
			>
				<Text color={'white'} fontSize="1.1rem" fontWeight="bold">
					Continue
				</Text>
			</Button>
		</>
	);
}
