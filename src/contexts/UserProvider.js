import {
	useReducer,
	useMemo,
	useEffect,
	useCallback,
	createContext,
	useRef,
} from 'react';
import userReducer from 'reducers/userReducer';
import { getUser } from 'services/firestore';
export const UserContext = createContext({});

const UserProvider = (props) => {
	const firstUpdate = useRef(true);
	const initialState = {
		auth: {},
		user: {},
		os: 'Windows', //operating system
		isLogin: false,
	};
	const [state, dispatch] = useReducer(userReducer, initialState);
	const { auth, user, os, isLogin } = state;
	const setAuth = useCallback(
		(value) => {
			dispatch({
				type: 'SET_AUTH',
				payload: { value },
			});
		},
		[dispatch]
	);
	const setUser = useCallback(
		(value) => {
			dispatch({
				type: 'SET_USER',
				payload: { value },
			});
		},
		[dispatch]
	);
	const setOS = useCallback(
		(value) => {
			dispatch({
				type: 'SET_OS',
				payload: { value },
			});
		},
		[dispatch]
	);
	const setIsLogin = useCallback(
		(value) => {
			dispatch({
				type: 'SET_IS_LOGIN',
				payload: { value },
			});
		},
		[dispatch]
	);
	const localStorageRemove = (names) => {
		names.forEach((n) => {
			localStorage.removeItem(n);
		});
	};
	const resetState = useCallback(() => {
		localStorageRemove(['auth', 'user', 'isLogin']);
		dispatch({
			type: 'RESET_STATE',
			payload: { initialState },
		});
	}, [dispatch]);

	useEffect(() => {
		if (navigator.appVersion.indexOf('Win') != -1) setOS('Windows');
		else if (navigator.appVersion.indexOf('Mac') != -1) setOS('Mac');
		else if (navigator.appVersion.indexOf('X11') != -1) setOS('X11');
		else if (navigator.appVersion.indexOf('Linux') != -1) setOS('Linux');
	}, []);

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			const loadData = async () => {
				const isLogin = JSON.parse(localStorage.getItem('isLogin'));
				if (isLogin) {
					const auth = JSON.parse(localStorage.getItem('auth'));
					let user = JSON.parse(localStorage.getItem('user'));
					user = await getUser(user._id);
					if (auth) setAuth(auth);
					if (user) setUser(user);
					if (isLogin) setIsLogin(isLogin);
				}
			};
			loadData();
			return;
		}

		localStorage.setItem('auth', JSON.stringify(auth));
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('isLogin', JSON.stringify(isLogin));
	}, [auth, user, isLogin]);

	const contextValue = useMemo(
		() => ({
			auth,
			user,
			os,
			isLogin,
		}),
		[auth, user, os, isLogin]
	);

	return (
		<UserContext.Provider
			value={{
				contextValue,
				setAuth,
				setUser,
				setIsLogin,
				resetState,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserProvider;
