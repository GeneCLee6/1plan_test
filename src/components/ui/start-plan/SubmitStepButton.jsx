import React from 'react';
import { Text, Button } from '@chakra-ui/react';
import { STEP_BUTTON_PROPS } from './config';
export default function SkipStepButton({ isSubmitting }) {
	return (
		<>
			<Button {...STEP_BUTTON_PROPS} isLoading={isSubmitting} value={'Submit'}>
				<Text color={'white'} fontSize="1.1rem" fontWeight="bold">
					Submit
				</Text>
			</Button>
		</>
	);
}
