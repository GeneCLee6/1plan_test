import React, { lazy } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

const SignupForm = lazy(() => import('./components/SignupForm'));
const Wallpaper = lazy(() => import('components/ui/landing/Wallpaper'));
export default function signup() {
	return (
		<Grid templateColumns="1fr 2fr">
			<GridItem w="100%" h="100vh" colSpan={1}>
				<SignupForm />
			</GridItem>
			<GridItem w="100%" h="10" colSpan={1}>
				<Wallpaper />
			</GridItem>
		</Grid>
	);
}
