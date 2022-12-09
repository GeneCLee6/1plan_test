import { getDocByRef } from 'services/firestore';

export const getSection2 = async (planRef) => {
	const plan = await getDocByRef(planRef);
	const section2Ref = plan.planSectionRefs[1];
	const section2Doc = await getDocByRef(section2Ref);
	return section2Doc;
};