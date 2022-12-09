const sectionReducer = (state, action) => {
	switch (action.type) {
		case 'SET_PROGRESS':
			return {
				...state,
				[action.payload.sectionName]: {
					...state[action.payload.sectionName],
					progress: action.payload.progress,
				},
			};
		case 'SET_TOTAL_ANSWERED':
			return {
				...state,
				[action.payload.sectionName]: {
					...state[action.payload.sectionName],
					totalAnswered: action.payload.totalAnswered,
				},
			};
		case 'UPDATE_SECTION':
			const { partNumber, data, sectionName } = action.payload;
			const newSection = { ...state[sectionName] };
			newSection[partNumber] = {
				...state[sectionName][partNumber],
				...data,
			};
			return {
				...state,
				[sectionName]: newSection,
			};
		case 'SET_SECTION':
			return {
				...state,
				[action.payload.sectionName]: action.payload.newSection,
			};
	}
	throw new Error('no matching action type');
};

export default sectionReducer;
