import React, { lazy } from 'react';
import { Box, Flex } from '@chakra-ui/react';

const ContinueStepButton = lazy(() =>
	import('components/ui/start-plan/ContinueStepButton')
);

const SkipStepButton = lazy(() =>
	import('components/ui/start-plan/SkipStepButton')
);
const PreviousStepButton = lazy(() =>
	import('components/ui/start-plan/PreviousStepButton')
);
const SubmitStepButton = lazy(() =>
	import('components/ui/start-plan/SubmitStepButton')
);
export default function StepButtonGroup({
	currentStep,
	firstStep,
	lastStep,
	isSubmitting = false,
}) {
	return (
		<>
			<Flex m="5" justifyContent={'end'} bg="white" h="20">
				{currentStep != lastStep && (
					<Box mx={5}>
						<SkipStepButton isSubmitting={isSubmitting} />
					</Box>
				)}
				{currentStep != firstStep && (
					<Box mx="5">
						<PreviousStepButton isSubmitting={isSubmitting} />
					</Box>
				)}
				<Box mx={5}>
					{currentStep != lastStep ? (
						<ContinueStepButton isSubmitting={isSubmitting} />
					) : (
						<SubmitStepButton isSubmitting={isSubmitting} />
					)}
				</Box>
			</Flex>
		</>
	);
}
