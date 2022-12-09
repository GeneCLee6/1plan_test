import { getDocByRef } from 'services/firestore';

export const getSection1 = async (planRef) => {
	const plan = await getDocByRef(planRef);
	const section1Ref = plan.planSectionRefs[0];
	const section1Doc = await getDocByRef(section1Ref);
	return section1Doc;
};
