import { getDocByRef } from 'services/firestore';

export const getSection3 = async (planRef) => {
	const plan = await getDocByRef(planRef);
	const section3Ref = plan.planSectionRefs[2];
	const section3Doc = await getDocByRef(section3Ref);
	return section3Doc;
};
