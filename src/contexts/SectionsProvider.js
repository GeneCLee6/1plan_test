import {
	useReducer,
	useMemo,
	useEffect,
	useCallback,
	createContext,
} from 'react';
import sectionReducer from 'reducers/sectionsReducer';
export const SectionsContext = createContext({});

const initialState = {
	quickStart: {
		totalAnswered: 0,
		progress: 0,
	},
	rewardsCelebrations: {
		totalAnswered: 0,
		progress: 0,
	},
	strengthsOpportunities: {
		totalAnswered: 0,
		progress: 0,
	},
	visionOfSuccess: {
		totalAnswered: 0,
		progress: 0,
	},
	numbers: {
		totalAnswered: 0,
		progress: 0,
	},
};

const SectionsProvider = (props) => {
	const [state, dispatch] = useReducer(sectionReducer, initialState);
	const {
		quickStart,
		rewardsCelebrations,
		strengthsOpportunities,
		visionOfSuccess,
		numbers,
	} = state;

	const setTotalAnswered = useCallback(
		(sectionName, newTotalAnswered) => {
			dispatch({
				type: 'SET_TOTAL_ANSWERED',
				payload: { sectionName, totalAnswered: newTotalAnswered },
			});
		},
		[dispatch]
	);
	const setProgress = useCallback(
		(sectionName, newProgress) => {
			dispatch({
				type: 'SET_PROGRESS',
				payload: { sectionName, progress: newProgress },
			});
		},
		[dispatch]
	);
	const updateSection = useCallback(
		(sectionName, partNumber, data) => {
			dispatch({
				type: 'UPDATE_SECTION',
				payload: { sectionName, partNumber, data },
			});
		},
		[dispatch]
	);
	const setSection = useCallback(
		(sectionName, newSection) => {
			dispatch({
				type: 'SET_SECTION',
				payload: { sectionName, newSection },
			});
		},
		[dispatch]
	);

	useEffect(() => {}, []);

	const contextValue = useMemo(
		() => ({
			quickStart,
			rewardsCelebrations,
			strengthsOpportunities,
			visionOfSuccess,
			numbers,
		}),
		[
			quickStart,
			rewardsCelebrations,
			strengthsOpportunities,
			visionOfSuccess,
			numbers,
		]
	);
	return (
		<SectionsContext.Provider
			value={{
				contextValue,
				setProgress,
				setTotalAnswered,
				updateSection,
				setSection,
			}}
		>
			{props.children}
		</SectionsContext.Provider>
	);
};

export default SectionsProvider;
