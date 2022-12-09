import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import App from './App';

const Header = lazy(() => import('components/layouts/Header'));
const Snackbar = lazy(() => import('components/ui/Snackbar'));
const Loading = lazy(() => import('components/ui/Loading'));

const AppHeader = () => {
	const location = useLocation();
	const noHeaderPathNames = ['/404', '/login', '/signup', '/forgot-password'];
	return !noHeaderPathNames.includes(location.pathname) && <Header />;
};

export default function AppWrapper() {
	return (
		<>
			<Router>
				<Suspense fallback={<Loading />}>
					<AppHeader />
					<Snackbar />
					<App />
				</Suspense>
			</Router>
		</>
	);
}
