const reportReducer = (state, action) => {
	switch (action.type) {
		case 'SET_IS_SHOW_PROMPTS':
			return {
				...state,
				isShowPrompts: action.payload.value,
			};
	}
	throw new Error('no matching action type');
};

export default reportReducer;
