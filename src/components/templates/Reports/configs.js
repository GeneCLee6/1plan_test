import { lazy, useContext } from 'react';
import { ReportContext } from 'contexts/ReportProvider';
const QuickStartReport = lazy(() => import('./components/QuickStartReport'));
const RewardsCelebrationsReport = lazy(() =>
  import('./components/RewardsCelebrationsReport')
);
const VisionOfSuccessReport = lazy(() =>
  import('./components/VisionOfSuccessReport')
);
const StrengthsOpportunitiesReport = lazy(() =>
  import('./components/StrengthsOpportunitiesReport')
);
const NumbersReport = lazy(() => import('./components/NumbersReport'));

const _SPQuickStartReport = lazy(() =>
  import('./components/_ShowPrompts/QuickStartReport')
);
const _SPRewardsCelebrationsReport = lazy(() =>
  import('./components/_ShowPrompts/RewardsCelebrationsReport')
);
const _SPVisionOfSuccessReport = lazy(() =>
  import('./components/_ShowPrompts/VisionOfSuccessReport')
);
const _SPStrengthsOpportunitiesReport = lazy(() =>
  import('./components/_ShowPrompts/StrengthsOpportunitiesReport')
);
const _SPNumbersReport = lazy(() =>
  import('./components/_ShowPrompts/NumbersReport')
);

export default function usePlanSectionsAccordionItems() {
  const {
    contextValue: { isShowPrompts },
  } = useContext(ReportContext);

  return [
    {
      label: 'QUICK START',
      description: 'What I actually need to do in the nest 90 days',
      labelBgColor: '#334B66',
      content: !isShowPrompts ? <QuickStartReport /> : <_SPQuickStartReport />,
    },
    {
      label: 'REWARDS & CELEBRATIONS',
      description: 'How do we measure our success?',
      labelBgColor: '#DA5E97',
      content: !isShowPrompts ? (
        <RewardsCelebrationsReport />
      ) : (
        <_SPRewardsCelebrationsReport />
      ),
    },
    {
      label: 'STRENGTHS AND OPPORTUNITIES',
      description:
        'What have we got to work with and what are our valuation drivers?',
      labelBgColor: '#7BCDBE',
      content: !isShowPrompts ? (
        <StrengthsOpportunitiesReport />
      ) : (
        <_SPStrengthsOpportunitiesReport />
      ),
    },
    {
      label: 'VISION OF SUCCESS',
      description: 'Why do we do what we do?',
      labelBgColor: '#8281EB',
      content: !isShowPrompts ? (
        <VisionOfSuccessReport />
      ) : (
        <_SPVisionOfSuccessReport />
      ),
    },
    {
      label: 'THE NUMBERS',
      description: 'What do our numbers look like?',
      labelBgColor: '#4A69BD',
      content: !isShowPrompts ? <NumbersReport /> : <_SPNumbersReport />,
    },
  ];
}

// export const PLAN_SECTIONS_ACCORDION_ITEMS =
