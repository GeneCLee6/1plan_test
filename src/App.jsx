import React, { lazy, useContext } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { UserContext } from 'contexts/UserProvider';

const Home = lazy(() => import('components/templates/Home'));
const QuickStart = lazy(() =>
	import('components/templates/StartPlan/QuickStart')
);
const RewardsCelebrations = lazy(() =>
	import('components/templates/StartPlan/RewardsCelebrations')
);
const StrengthsOpportunities = lazy(() =>
	import('components/templates/StartPlan/StrengthsOpportunities')
);
const VisionOfSuccess = lazy(() =>
	import('components/templates/StartPlan/VisionOfSuccess')
);
const Reports = lazy(() => import('components/templates/Reports'));
const Numbers = lazy(() => import('components/templates/StartPlan/Numbers'));
const Login = lazy(() => import('components/templates/Login'));
const Signup = lazy(() => import('components/templates/Signup'));
const Error404 = lazy(() => import('components/templates/404'));
const PDF = lazy(() => import('components/templates/PDF'));
const ForgotPassword = lazy(() =>
	import('components/templates/ForgotPassword')
);
function App() {
	const {
		contextValue: { isLogin, auth },
	} = useContext(UserContext);

	const routes = useRoutes([
		{
			path: '/',
			element: isLogin ? (
				<Navigate to="/home/dashboard" replace={true} />
			) : (
				<Navigate to="/login" replace={true} />
			),
		},
		{
			path: '/home',
			element: isLogin ? (
				<Navigate to="/home/dashboard" replace={true} />
			) : (
				<Navigate to="/login" replace={true} />
			),
		},
		{
			path: '/reports',
			element: true ? <Reports /> : <Navigate to="/login" replace={true} />,
		},
		{
			path: '/home',
			children: [
				'dashboard',
				'company-info',
				'company-info/create',
				'invite-user',
				'profile',
			].map((path) => ({
				path,
				element: isLogin ? <Home /> : <Navigate to="/login" replace={true} />,
			})),
		},
		{
			path: '/start-plan/quick-start',
			element: isLogin ? (
				<QuickStart />
			) : (
				<Navigate to="/login" replace={true} />
			),
		},
		{
			path: '/start-plan/rewards-celebrations',
			element: isLogin ? (
				<RewardsCelebrations />
			) : (
				<Navigate to="/login" replace={true} />
			),
		},
		{
			path: '/start-plan/strengths-opportunities',
			element: isLogin ? (
				<StrengthsOpportunities />
			) : (
				<Navigate to="/login" replace={true} />
			),
		},
		{
			path: '/start-plan/vision-of-success',
			element: isLogin ? (
				<VisionOfSuccess />
			) : (
				<Navigate to="/login" replace={true} />
			),
		},
		{
			path: '/start-plan/numbers',
			element: isLogin ? <Numbers /> : <Navigate to="/login" replace={true} />,
		},
		{
			path: '/login',
			element: isLogin ? <Navigate to="/home" replace={true} /> : <Login />,
		},
		{
			path: '/signup',
			element: isLogin ? <Navigate to="/home" replace={true} /> : <Signup />,
		},
		{
			path: '/forgot-password',
			element: isLogin ? (
				<Navigate to="/home" replace={true} />
			) : (
				<ForgotPassword />
			),
		},
		{ path: '/pdf', element: <PDF /> },
		{ path: '/404', element: <Error404 /> },
		{ path: '*', element: <Navigate to="/404" replace={true} /> },
	]);
	return routes;
}

export default App;
