import React, { useContext, useEffect } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { SnackbarContext } from 'contexts/SnackbarProvider';

export default function Snackbar() {
	const {
		contextValue: { show, timeout, message, styles },
		updateSnackbarState,
	} = useContext(SnackbarContext);

	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				updateSnackbarState('show', false);
			}, timeout);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [show]);
	return (
		<>
			{show && (
				<Flex {...styles}>
					<Text noOfLines={0}>{message}</Text>
				</Flex>
			)}
		</>
	);
}
