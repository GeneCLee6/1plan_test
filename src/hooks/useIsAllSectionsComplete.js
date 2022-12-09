import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from 'contexts/UserProvider';
import { getPlanAllPlanSections } from 'services/firestore';

export default function useIsAllSectionsComplete() {
	const {
		contextValue: { user },
	} = useContext(UserContext);
	const [progresses, setProgresses] = useState([0, 0, 0, 0, 0]);
	useEffect(() => {
		const loadPlanSections = async () => {
			const planSections = await getPlanAllPlanSections(user.company.planRef);
			const sectionProgresses = planSections.map((s, i) => {
				const progress = +s[`section${i + 1}`].progress;
				return progress ? progress : 0;
			});
			setProgresses(sectionProgresses);
		};
		if (user?.company?.planRef) {
			loadPlanSections();
		}
	}, [user?.company?.planRef]);
	console.log(progresses);
	return progresses.reduce((sum, val) => sum + val, 0) === 500;
}
