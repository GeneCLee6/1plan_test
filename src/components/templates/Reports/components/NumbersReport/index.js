import React, { lazy } from 'react';
import { Box, Text, Grid, GridItem } from '@chakra-ui/react';

const Row1 = lazy(() => import('./Row1'));

export default function Number() {
	return (
		<>
			<Text fontWeight={'bold'}>INDUSTRY: Fast moving goods distribution</Text>
			<Grid templateColumns="repeat(4, 350px)" gap={6}>
				<Row1 />
			</Grid>
		</>
	);
}
