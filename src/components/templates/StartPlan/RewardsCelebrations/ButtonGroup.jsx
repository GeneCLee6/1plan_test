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
export default function ButtonGroup({ page, status }) {
	return (
		<>
			<Flex m="5" justifyContent={'end'} bg="white" h="20">
				<Box mx={5} display={page < 5 ? 'block' : 'none'}>
					<SkipStepButton isSubmitting={status.isSubmitting} />
				</Box>
				<Box mx="5" display={page > 1 ? 'block' : 'none'}>
					<PreviousStepButton isSubmitting={status.isSubmitting} />
				</Box>
				<Box mx={5}>
					{page < 5 ? (
						<ContinueStepButton isSubmitting={status.isSubmitting} />
					) : (
						<SubmitStepButton isSubmitting={status.isSubmitting} />
					)}
				</Box>
			</Flex>
		</>
	);
}
