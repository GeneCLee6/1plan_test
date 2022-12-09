import { useEffect, useContext, useState } from 'react';
import { UserContext } from 'contexts/UserProvider';
import { getDocByRef } from 'services/firestore';

export const DEFAULT_BORDER_RADIUS = '8px';
export const DEFAULT_BOX_SHADOW = '0px 4px 4px rgba(0, 0, 0, 0.25)';
export const DEFAULT_BORDER = '4px solid rgba(0, 0, 0, 0.07)';
export const INDUSTRY_OPTIONS = [
	'Wholesaling',
	'Retailing',
	'Manufacturing',
	'Construction',
	'Professional Services',
	'Financial Services',
	'Training Providers',
	'Medical Service Providers',
	'Technology & Online',
];
export const BUSINESS_TYPES = [
	'Sole Trader',
	'Partnership',
	'Company',
	'Trust',
];

export const useSectionProgressRows = () => {
	const {
		contextValue: { user },
	} = useContext(UserContext);
	const [
		[progress1, progress2, progress3, progress4, progress5],
		setProgresses,
	] = useState([]);

	useEffect(() => {
		const loadProgresses = async () => {
			if (user.company.planRef) {
				const planDoc = await getDocByRef(user.company.planRef);
				const sectionProgresses = await Promise.all(
					planDoc.planSectionRefs.map(async (r, i) => {
						const section = await getDocByRef(r);
						const progress = section[`section${i + 1}`].progress;
						return progress ? progress : 0;
					})
				);
				setProgresses(sectionProgresses);
			} else {
				setProgresses([0, 0, 0, 0, 0]);
			}
		};

		loadProgresses();
	}, [user.company.planRef, user.company]);

	const getProgressColour = (progress) => {
		if (progress == 0) return 'red';
		if (progress == 100) return '#27D49B';
		if (progress > 0 && progress < 100) return '#FFC267';
	};
	const getProgressStatus = (progress) => {
		if (progress == 0) return 'Not Started';
		if (progress == 100) return 'Completed';
		if (progress > 0 && progress < 100) return 'In Progress';
	};

	return [
		{
			section: 'Quick Start',
			route: '/start-plan/quick-start',
			status: getProgressStatus(progress1),
			colour: getProgressColour(progress1),
			progress: progress1,
			isEnable: true,
		},
		{
			section: 'Rewards & Celebrations',
			route: '/start-plan/rewards-celebrations',
			status: getProgressStatus(progress2),
			colour: getProgressColour(progress2),
			progress: progress2,
			isEnable: progress1 > 0,
		},
		{
			section: 'Strengths & Opportunities',
			route: '/start-plan/strengths-opportunities',
			status: getProgressStatus(progress3),
			colour: getProgressColour(progress3),
			progress: progress3,
			isEnable: true,
		},
		{
			section: 'Vision of Success',
			route: '/start-plan/vision-of-success',
			status: getProgressStatus(progress4),
			colour: getProgressColour(progress4),
			progress: progress4,
			isEnable: true,
		},
		{
			section: 'Numbers',
			route: '/start-plan/numbers',
			status: getProgressStatus(progress5),
			colour: getProgressColour(progress5),
			progress: progress5,
			isEnable: true,
		},
	];
};
