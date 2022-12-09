import React from 'react';
import { Text, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { STEP_BUTTON_PROPS } from './config';

export default function PreviousStepButton({ isSubmitting }) {
	return (
		<>
			<Button
				{...STEP_BUTTON_PROPS}
				isLoading={isSubmitting}
				leftIcon={<ArrowBackIcon boxSize="1.3rem" color={'white'} />}
				value={'Previous'}
			>
				<Text color={'white'} fontSize="1.1rem" fontWeight="bold">
					Previous
				</Text>
			</Button>
		</>
	);
}
