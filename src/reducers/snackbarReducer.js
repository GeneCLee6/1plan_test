import { isObject } from 'utils/common';
const snackbarReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_STATE':
			if (isObject(action.payload.value)) {
				return {
					...state,
					[action.payload.stateName]: {
						...state[action.payload.stateName],
						...action.payload.value,
					},
				};
			}
			return {
				...state,
				[action.payload.stateName]: action.payload.value,
			};
		case 'UPDATE_STATES':
			return {
				...state,
				...action.payload.statesObj,
			};
	}
	throw new Error('no matching action type');
};

export default snackbarReducer;
