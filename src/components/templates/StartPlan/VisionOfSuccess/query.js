import { getDocByRef } from 'services/firestore';

export const getSection4 = async (planRef) => {
  const plan = await getDocByRef(planRef);
  const section4Ref = plan.planSectionRefs[3];
  const section4Doc = await getDocByRef(section4Ref);
  return section4Doc;
};
