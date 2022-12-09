import {
	useReducer,
	useMemo,
	useEffect,
	useCallback,
	createContext,
} from 'react';
import snackbarReducer from 'reducers/snackbarReducer';
export const SnackbarContext = createContext({});

const initialState = {
	show: false,
	timeout: 5000,
	message: '',
	styles: {
		color: 'white',
		position: 'fixed',
		zIndex: 200,
		boxShadow: 'xl',
		p: '15px',
		top: '10px',
		left: '0',
		right: '0',
		minW: '200px',
		maxW: '400px',
		minH: '50px',
		borderRadius: '5px',
		justifyContent: 'center',
		mx: 'auto',
		bgColor: '#60fb7a',
	},
};

const SnackbarProvider = (props) => {
	const [state, dispatch] = useReducer(snackbarReducer, initialState);
	const { show, timeout, message, styles } = state;

	const updateState = useCallback(
		(stateName, newValue) => {
			dispatch({
				type: 'UPDATE_STATE',
				payload: { stateName, value: newValue },
			});
		},
		[dispatch]
	);

	const updateStates = useCallback(
		(statesObj) => {
			dispatch({
				type: 'UPDATE_STATES',
				payload: { statesObj },
			});
		},
		[dispatch]
	);

	const contextValue = useMemo(
		() => ({ show, timeout, message, styles }),
		[show, timeout, message, styles]
	);
	return (
		<SnackbarContext.Provider
			value={{
				contextValue,
				updateSnackbarState: updateState,
				updateSnackbarStates: updateStates,
			}}
		>
			{props.children}
		</SnackbarContext.Provider>
	);
};

export default SnackbarProvider;
