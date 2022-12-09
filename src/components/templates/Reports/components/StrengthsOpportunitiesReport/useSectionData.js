import { useContext } from 'react';
import { SectionsContext } from 'contexts/SectionsProvider';

export default function useSectionData() {
  const {
    contextValue: {
      quickStart,
      rewardsCelebrations,
      strengthsOpportunities,
      visionOfSuccess,
      numbers,
    },
  } = useContext(SectionsContext);

  function handleHours(x) {
    if (x) {
      return `${strengthsOpportunities?.part3?.q6.answers[3]} hours`;
    } else {
      return '';
    }
  }

  function handleBanking(x) {
    if (
      numbers?.page2?.q3[1] &&
      numbers?.page2?.q4[1] &&
      numbers?.page2?.q5[1] &&
      strengthsOpportunities?.part3?.q3.answers[0] &&
      strengthsOpportunities?.part3?.q3.answers[0]
    ) {
      if (!!x) {
        return x;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  function handleAcc(x) {
    if (
      numbers?.page5?.q10[1] &&
      numbers?.page4?.q9[1] &&
      numbers?.page4?.q8[1] &&
      numbers?.page3?.q6[1] &&
      numbers?.page2?.q3[1] &&
      numbers?.page2?.q4[1] &&
      numbers?.page2?.q5[1] &&
      strengthsOpportunities?.part3?.q3.answers[0] &&
      strengthsOpportunities?.part3?.q3.answers[0]
    ) {
      if (!!x) {
        return x;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  function handleOverhead(x) {
    if (
      numbers?.page5?.q10[1] &&
      numbers?.page2?.q3[1] &&
      numbers?.page2?.q4[1] &&
      numbers?.page2?.q5[1] &&
      strengthsOpportunities?.part3?.q3.answers[0] &&
      strengthsOpportunities?.part3?.q3.answers[0]
    ) {
      if (!!x) {
        return x;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  function handleMarketing(x) {
    if (
      numbers?.page3?.q6[1] &&
      numbers?.page2?.q3[1] &&
      numbers?.page2?.q4[1] &&
      numbers?.page2?.q5[1] &&
      strengthsOpportunities?.part3?.q3.answers[0] &&
      strengthsOpportunities?.part3?.q3.answers[0]
    ) {
      if (!!x) {
        return x;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  const revenue1 =
    numbers?.page2?.q3[1] * numbers?.page2?.q4[1] * numbers?.page2?.q5[1];
  const trandingDaysPerYear =
    strengthsOpportunities?.part3?.q3.answers[0] *
    strengthsOpportunities?.part3?.q3.answers[1];
  const banking = (revenue1 / trandingDaysPerYear).toFixed(2);
  const marketing1 = (revenue1 * numbers?.page3?.q6[1] * 0.01).toFixed(2);
  const maketingSpent = (marketing1 / trandingDaysPerYear).toFixed(2);
  const overhead1 = (revenue1 * numbers?.page5?.q10[1] * 0.01).toFixed(2);
  const overheadTrf = (overhead1 / trandingDaysPerYear).toFixed(2);
  const sales1 = (revenue1 * numbers?.page4?.q8[1] * 0.01).toFixed(2);
  const direct1 = (revenue1 * numbers?.page4?.q9[1] * 0.01).toFixed(2);
  const ebit = (revenue1 - marketing1 - sales1 - direct1 - overhead1).toFixed(
    2
  );
  const accumulationTrf = (ebit / trandingDaysPerYear).toFixed(2);

  return {
    CARD1: {
      title: 'STRENGTH',
      list: [
        strengthsOpportunities?.part1?.q1.answers.aSt1[0],
        strengthsOpportunities?.part1?.q1.answers.aSt2[0],
      ],
      question: 'How can I use this?',
      action: [
        strengthsOpportunities?.part1?.q1.answers.aSt1[1],
        strengthsOpportunities?.part1?.q1.answers.aSt2[1],
      ],
    },
    CARD2: {
      title: 'WEAKNESSES',
      list: [
        strengthsOpportunities?.part1?.q1.answers.aWe1[0],
        strengthsOpportunities?.part1?.q1.answers.aWe2[0],
      ],
      question: 'How can I mitigate this?',
      action: [
        strengthsOpportunities?.part1?.q1.answers.aWe1[1],
        strengthsOpportunities?.part1?.q1.answers.aWe2[1],
      ],
    },
    CARD3: {
      title: 'OPPORTUNITIES',
      list: [
        strengthsOpportunities?.part2?.q2.answers.aOp1[0],
        strengthsOpportunities?.part2?.q2.answers.aOp2[0],
      ],
      question: 'How Can I Capitalise this?',
      action: [
        strengthsOpportunities?.part2?.q2.answers.aOp1[1],
        strengthsOpportunities?.part2?.q2.answers.aOp2[1],
      ],
    },
    CARD4: {
      title: 'THREATS',
      list: [
        strengthsOpportunities?.part2?.q2.answers.aTh1[0],
        strengthsOpportunities?.part2?.q2.answers.aTh2[0],
      ],
      question: 'How can I mitigate this?',
      action: [
        strengthsOpportunities?.part2?.q2.answers.aTh1[1],
        strengthsOpportunities?.part2?.q2.answers.aTh2[1],
      ],
    },
    CARD5: {
      title: 'Trading Day',
      subtitle: 'How many days have i got to earn cash?',
      list: [
        {
          label: 'Trading Days per week',
          content: strengthsOpportunities?.part3?.q3.answers[0],
        },
        {
          label: 'Trading Weeks per year',
          content: strengthsOpportunities?.part3?.q3.answers[1],
        },
        {
          label: 'Trading Days per year',
          content: trandingDaysPerYear ? trandingDaysPerYear : '',
        },
        {
          label: 'Non Trading period',
          content: strengthsOpportunities?.part3?.q3.answers[2],
        },
      ],
    },
    CARD6: {
      title: 'Daily Cash',
      subtitle: 'How much money do i need to open the doors each day?',
      list: [
        { label: 'Banking (inviting)', content: handleBanking(banking) },
        {
          label: 'Marketing Spend',
          content: handleMarketing(maketingSpent),
        },
        { label: 'Overhead Trf', content: handleOverhead(overheadTrf) },
        {
          label: 'Accumulation Trf',
          content: handleAcc(accumulationTrf),
        },
      ],
    },
    CARD7: {
      title: 'Clients',
      subtitle: 'What do we do to keep up our clients happy?',
      list: [
        {
          label: strengthsOpportunities?.part3?.q4.answers.a1[0],
          content: strengthsOpportunities?.part3?.q4.answers.a1[1],
        },
        {
          label: strengthsOpportunities?.part3?.q4.answers.a2[0],
          content: strengthsOpportunities?.part3?.q4.answers.a2[1],
        },
        {
          label: strengthsOpportunities?.part3?.q4.answers.a3[0],
          content: strengthsOpportunities?.part3?.q4.answers.a3[1],
        },
        {
          label: strengthsOpportunities?.part3?.q4.answers.a4[0],
          content: strengthsOpportunities?.part3?.q4.answers.a4[1],
        },
      ],
    },
    CARD8: {
      title: 'Team Members',
      subtitle: 'How can i get best out of my team?             ',
      list: [
        {
          label: strengthsOpportunities?.part3?.q5.answers.a1[0],
          content: strengthsOpportunities?.part3?.q5.answers.a1[1],
        },
        {
          label: strengthsOpportunities?.part3?.q5.answers.a2[0],
          content: strengthsOpportunities?.part3?.q5.answers.a2[1],
        },
        {
          label: strengthsOpportunities?.part3?.q5.answers.a3[0],
          content: strengthsOpportunities?.part3?.q5.answers.a3[1],
        },
        {
          label: strengthsOpportunities?.part3?.q5.answers.a4[0],
          content: strengthsOpportunities?.part3?.q5.answers.a4[1],
        },
      ],
    },
    CARD9: {
      title: 'Owner and Shareholders',
      subtitle: 'What makes it worth my white to be in business?',
      list: [
        {
          label: 'Earned Last financial year',
          content: strengthsOpportunities?.part3?.q6.answers[0],
        },
        {
          label: 'Target inc/dec this year',
          content: strengthsOpportunities?.part3?.q6.answers[1],
        },
        {
          label: 'Dividend/Bonus',
          content: strengthsOpportunities?.part3?.q6.answers[2],
        },
        {
          label: 'Hours Worked ea.',
          content: handleHours(strengthsOpportunities?.part3?.q6.answers[3]),
        },
      ],
    },
    CARD10: {
      title: 'Product and Service',
      subtitle: 'What do I have to offer?',
      list: [
        {
          label: strengthsOpportunities?.part3?.q8.answers.a1[0],
          content: strengthsOpportunities?.part3?.q8.answers.a1[1],
        },
        {
          label: strengthsOpportunities?.part3?.q8.answers.a2[0],
          content: strengthsOpportunities?.part3?.q8.answers.a2[1],
        },
        {
          label: strengthsOpportunities?.part3?.q8.answers.a3[0],
          content: strengthsOpportunities?.part3?.q8.answers.a3[1],
        },
        {
          label: strengthsOpportunities?.part3?.q8.answers.a4[0],
          content: strengthsOpportunities?.part3?.q8.answers.a4[1],
        },
      ],
    },
    CARD11: {
      title: 'MARKETING',
      subtitle: 'How will people find me?',
      list: [
        {
          label: strengthsOpportunities?.part3?.q9.answers.a1[0],
          content: strengthsOpportunities?.part3?.q9.answers.a1[1],
        },
        {
          label: strengthsOpportunities?.part3?.q9.answers.a2[0],
          content: strengthsOpportunities?.part3?.q9.answers.a2[1],
        },
        {
          label: strengthsOpportunities?.part3?.q9.answers.a3[0],
          content: strengthsOpportunities?.part3?.q9.answers.a3[1],
        },
        {
          label: strengthsOpportunities?.part3?.q9.answers.a4[0],
          content: strengthsOpportunities?.part3?.q9.answers.a4[1],
        },
      ],
    },
    CARD12: {
      title: 'SALES',
      subtitle: 'What can i do to sell more?',
      list: [
        {
          label: strengthsOpportunities?.part3?.q10.answers.a1[0],
          content: strengthsOpportunities?.part3?.q10.answers.a1[1],
        },
        {
          label: strengthsOpportunities?.part3?.q10.answers.a2[0],
          content: strengthsOpportunities?.part3?.q10.answers.a2[1],
        },
        {
          label: strengthsOpportunities?.part3?.q10.answers.a3[0],
          content: strengthsOpportunities?.part3?.q10.answers.a3[1],
        },
        {
          label: strengthsOpportunities?.part3?.q10.answers.a4[0],
          content: strengthsOpportunities?.part3?.q10.answers.a4[1],
        },
      ],
    },
    CARD13: {
      title: 'FULFUILMENT',
      subtitle: 'What can i do to sell more?',
      list: [
        {
          label: strengthsOpportunities?.part3?.q11.answers.a1[0],
          content: strengthsOpportunities?.part3?.q11.answers.a1[1],
        },
        {
          label: strengthsOpportunities?.part3?.q11.answers.a2[0],
          content: strengthsOpportunities?.part3?.q11.answers.a2[1],
        },
        {
          label: strengthsOpportunities?.part3?.q11.answers.a3[0],
          content: strengthsOpportunities?.part3?.q11.answers.a3[1],
        },
        {
          label: strengthsOpportunities?.part3?.q11.answers.a4[0],
          content: strengthsOpportunities?.part3?.q11.answers.a4[1],
        },
      ],
    },
    CARD14: {
      title: 'SUPPORT',
      subtitle: 'How to improve customer experience?',
      list: [
        {
          label: strengthsOpportunities?.part3?.q12.answers.a1[0],
          content: strengthsOpportunities?.part3?.q12.answers.a1[1],
        },
        {
          label: strengthsOpportunities?.part3?.q12.answers.a2[0],
          content: strengthsOpportunities?.part3?.q12.answers.a2[1],
        },
        {
          label: strengthsOpportunities?.part3?.q12.answers.a3[0],
          content: strengthsOpportunities?.part3?.q12.answers.a3[1],
        },
        {
          label: strengthsOpportunities?.part3?.q12.answers.a4[0],
          content: strengthsOpportunities?.part3?.q12.answers.a4[1],
        },
      ],
    },
    CARD15: {
      title: 'What is My unique Selling point (USP))?',
      description: strengthsOpportunities?.part4?.q13.answers[0],
    },
    CARD16: {
      title: 'What is my Elevator Pitch?',
      description: strengthsOpportunities?.part4?.q14.answers[0],
    },
    CARD17: {
      title: 'What is my Pitch Deck?',
      description: strengthsOpportunities?.part4?.q15.answers[0],
    },
  };
}
