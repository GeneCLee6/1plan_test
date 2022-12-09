const userReducer = (state, action) => {
	switch (action.type) {
		case 'SET_AUTH':
			return {
				...state,
				auth: action.payload.value,
			};
		case 'SET_USER':
			return {
				...state,
				user: action.payload.value,
			};
		case 'SET_OS':
			return {
				...state,
				os: action.payload.value,
			};
		case 'SET_IS_LOGIN':
			return {
				...state,
				isLogin: action.payload.value,
			};
		case 'RESET_STATE':
			return {
				...action.payload.initialState,
			};
	}
	throw new Error('no matching action type');
};

export default userReducer;
