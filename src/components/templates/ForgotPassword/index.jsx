import React, { lazy } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

const ForgotPasswordForm = lazy(() =>
	import('./components/ForgotPasswordForm')
);
const Wallpaper = lazy(() => import('components/ui/landing/Wallpaper'));

export default function ForgotPassword() {
	return (
		<Grid templateColumns="1fr 2fr">
			<GridItem w="100%" h="100vh" colSpan={1}>
				<ForgotPasswordForm />
			</GridItem>
			<GridItem w="100%" h="10" colSpan={1}>
				<Wallpaper />
			</GridItem>
		</Grid>
	);
}
