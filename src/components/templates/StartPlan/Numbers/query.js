import { getDocByRef } from 'services/firestore';

export const getSection5 = async (planRef) => {
  const plan = await getDocByRef(planRef);
  const section5Ref = plan.planSectionRefs[4];
  const section5Doc = await getDocByRef(section5Ref);
  return section5Doc;
};
