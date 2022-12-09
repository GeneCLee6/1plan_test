import {
	useReducer,
	useMemo,
	useEffect,
	useCallback,
	createContext,
	useRef,
} from 'react';
import reportReducer from 'reducers/reportReducer';
export const ReportContext = createContext({});

const ReportProvider = (props) => {
	const initialState = {
		isShowPrompts: true,
	};
	const [state, dispatch] = useReducer(reportReducer, initialState);
	const { isShowPrompts } = state;
	const setIsShowPrompts = useCallback(
		(value) => {
			dispatch({
				type: 'SET_IS_SHOW_PROMPTS',
				payload: { value },
			});
		},
		[dispatch]
	);

	const contextValue = useMemo(
		() => ({
			isShowPrompts,
		}),
		[isShowPrompts]
	);

	return (
		<ReportContext.Provider
			value={{
				contextValue,
				setIsShowPrompts,
			}}
		>
			{props.children}
		</ReportContext.Provider>
	);
};

export default ReportProvider;
