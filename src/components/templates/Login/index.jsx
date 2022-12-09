import React, { lazy } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

const LoginForm = lazy(() => import('./components/LoginForm'));
const Wallpaper = lazy(() => import('components/ui/landing/Wallpaper'));

export default function Login() {
	return (
		<Grid templateColumns="1fr 2fr">
			<GridItem w="100%" h="100vh" colSpan={1}>
				<LoginForm />
			</GridItem>
			<GridItem w="100%" h="10" colSpan={1}>
				<Wallpaper />
			</GridItem>
		</Grid>
	);
}
