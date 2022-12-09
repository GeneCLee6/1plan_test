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

  return {
    CARD1: {
      title: 'WHERE DO I WANT TO GO?',
      list: [
        {
          label: 'VISION',
          question: 'What are we striving to become?',
          answer: visionOfSuccess?.part1?.q3.answers,
        },
        {
          label: 'PURPOSE',
          question: 'Why do we do this??',
          answer: visionOfSuccess?.part1?.q2.answers,
        },
        {
          label: 'MISSION STATEMENT',
          question: 'What do we do everyday to meet vision?',
          answer: visionOfSuccess?.part1?.q4.answers.a1,
        },
      ],
    },
    CARD2: {
      title: 'What will the business look like？',
      label: 'LOOKS LIKE',
      subtitle: 'What does my business look like?',
      list: [
        visionOfSuccess?.part2?.q6.answers[0],
        visionOfSuccess?.part2?.q6.answers[1],
        visionOfSuccess?.part2?.q6.answers[2],
        visionOfSuccess?.part2?.q6.answers[3],
        visionOfSuccess?.part2?.q6.answers[4],
        visionOfSuccess?.part2?.q6.answers[5],
      ],
    },
    CARD3: {
      title: 'OUR PROMISE',
      label: 'THE BRAND PROMISES',
      subtitle: 'What will we stand and be known for?',
      list: [
        visionOfSuccess?.part2?.q7.answers[0],
        visionOfSuccess?.part2?.q7.answers[1],
        visionOfSuccess?.part2?.q7.answers[2],
        visionOfSuccess?.part2?.q7.answers[3],
        visionOfSuccess?.part2?.q7.answers[4],
        visionOfSuccess?.part2?.q7.answers[5],
      ],
    },
    CARD4: {
      title: 'OUR CORE VALUES',
      subtitle: `These don't change and are non-negotiable`,
      list: [
        visionOfSuccess?.part1?.q5.answers[0],
        visionOfSuccess?.part1?.q5.answers[1],
        visionOfSuccess?.part1?.q5.answers[2],
        visionOfSuccess?.part1?.q5.answers[3],
        visionOfSuccess?.part1?.q5.answers[4],
        visionOfSuccess?.part1?.q5.answers[5],
      ],
    },
    CARD5: {
      title: 'What we do everyday to meet the vision?',
      list: [
        visionOfSuccess?.part1?.q4.answers.a2[0],
        visionOfSuccess?.part1?.q4.answers.a2[1],
        visionOfSuccess?.part1?.q4.answers.a2[2],
        visionOfSuccess?.part1?.q4.answers.a2[3],
        visionOfSuccess?.part1?.q4.answers.a2[4],
      ],
    },
    CARD6: {
      title: '5 YR PRIORITIES',
      headers: [
        {
          label: 'Desired Goal',
        },
        {
          label: 'Desired Outcome',
        },
      ],
      rows: {
        a1: [
          visionOfSuccess?.part3?.q8c.answers.a1[0],
          visionOfSuccess?.part3?.q8c.answers.a1[1],
        ],
        a2: [
          visionOfSuccess?.part3?.q8c.answers.a2[0],
          visionOfSuccess?.part3?.q8c.answers.a2[1],
        ],
        a3: [
          visionOfSuccess?.part3?.q8c.answers.a3[0],
          visionOfSuccess?.part3?.q8c.answers.a3[1],
        ],
        a4: [
          visionOfSuccess?.part3?.q8c.answers.a4[0],
          visionOfSuccess?.part3?.q8c.answers.a4[1],
        ],
      },
    },
    CARD7: {
      title: '3 YR PRIORITIES',
      headers: [
        {
          label: 'Desired Goal',
        },
        {
          label: 'Desired Outcome',
        },
      ],
      rows: {
        a1: [
          visionOfSuccess?.part3?.q8b.answers.a1[0],
          visionOfSuccess?.part3?.q8b.answers.a1[1],
        ],
        a2: [
          visionOfSuccess?.part3?.q8b.answers.a2[0],
          visionOfSuccess?.part3?.q8b.answers.a2[1],
        ],
        a3: [
          visionOfSuccess?.part3?.q8b.answers.a3[0],
          visionOfSuccess?.part3?.q8b.answers.a3[1],
        ],
        a4: [
          visionOfSuccess?.part3?.q8b.answers.a4[0],
          visionOfSuccess?.part3?.q8b.answers.a4[1],
        ],
      },
    },
    CARD8: {
      title: 'ANNUAL PRIORITIES',
      headers: [
        {
          label: 'Desired Goal',
        },
        {
          label: 'Desired Outcome',
        },
      ],
      rows: {
        a1: [
          visionOfSuccess?.part3?.q8a.answers.a1[0],
          visionOfSuccess?.part3?.q8a.answers.a1[1],
        ],
        a2: [
          visionOfSuccess?.part3?.q8a.answers.a2[0],
          visionOfSuccess?.part3?.q8a.answers.a2[1],
        ],
        a3: [
          visionOfSuccess?.part3?.q8a.answers.a3[0],
          visionOfSuccess?.part3?.q8a.answers.a3[1],
        ],
        a4: [
          visionOfSuccess?.part3?.q8a.answers.a4[0],
          visionOfSuccess?.part3?.q8a.answers.a4[1],
        ],
      },
    },
  };
}
