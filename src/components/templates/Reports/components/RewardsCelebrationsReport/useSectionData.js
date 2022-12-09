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

  function handleUndefined(session, x) {
    if (session.length > 2) {
      if (x) {
        return x;
      } else {
        return '';
      }
    }
  }

  function handleImagePick(number) {
    if (+number < 20 && +number > 0) {
      return img4;
    } else if (+number >= 20 && +number < 50) {
      return img3;
    } else if (+number >= 50 && +number < 80) {
      return img2;
    } else if (+number >= 80) {
      return img1;
    } else {
      return img5;
    }
  }

  const img1 = require('assets/images/party.png');
  const img2 = require('assets/images/Happy-Emoji-Emoticon.png');
  const img3 = require('assets/images/oops-smiley.png');
  const img4 = require('assets/images/fail.png');
  const img5 = require('assets/images/null.jpg');

  return {
    CARD1: {
      title: 'TEAM - How I will know my team achieved their quarterly goals?',
      headers: [
        {
          label: 'KPI',
          width: '100px',
        },
        {
          label: 'Measure (in $, % or #)',
          width: '80px',
        },
        {
          label: 'Timing',
          width: '70px',
        },
      ],
      rows: {
        a1: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a1[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a1[1].value +
              rewardsCelebrations?.part1?.q2.answers.a1[1].unit
          ),
          img1,
        ],
        a2: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a1[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a1[2].value +
              rewardsCelebrations?.part1?.q2.answers.a1[2].unit
          ),
          img2,
        ],
        a3: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a1[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a1[3].value +
              rewardsCelebrations?.part1?.q2.answers.a1[3].unit
          ),
          img3,
        ],
        a4: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a1[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a1[4].value +
              rewardsCelebrations?.part1?.q2.answers.a1[4].unit
          ),
          img4,
        ],
      },
    },
    CARD2: {
      title: 'QUARTERLY TEAM REWARD CELEBRATION',
      image: rewardsCelebrations?.part2?.q3.answers[0],
    },
    CARD3: {
      title:
        'OWNER - How I will know my personal priorities achieved for this quarter?',
      headers: [
        {
          label: 'KPI',
          width: '100px',
        },
        {
          label: 'Measure (in $, % or #)',
          width: '80px',
        },
        {
          label: 'Timing',
          width: '70px',
        },
      ],
      rows: {
        a1: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a2[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a2[1].value +
              rewardsCelebrations?.part1?.q2.answers.a2[1].unit
          ),
          img1,
        ],
        a2: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a2[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a2[2].value +
              rewardsCelebrations?.part1?.q2.answers.a2[2].unit
          ),
          img2,
        ],
        a3: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a2[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a2[3].value +
              rewardsCelebrations?.part1?.q2.answers.a2[3].unit
          ),
          img3,
        ],
        a4: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a2[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part1?.q2.answers.a2[4].value +
              rewardsCelebrations?.part1?.q2.answers.a2[4].unit
          ),
          img4,
        ],
      },
    },
    CARD4: {
      title: 'TEAM - How I will know my team achieved their quarterly goals?',
      headers: [
        {
          label: 'KPI',
          width: '100px',
        },
        {
          label: 'Measure (in $, % or #)',
          width: '80px',
        },
        {
          label: 'Timing',
          width: '70px',
        },
      ],
      rows: {
        a1: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a1[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a1[1].value +
              rewardsCelebrations?.part3?.q5.answers.a1[1].unit
          ),
          img1,
        ],
        a2: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a1[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a1[2].value +
              rewardsCelebrations?.part3?.q5.answers.a1[2].unit
          ),
          img2,
        ],
        a3: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a1[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a1[3].value +
              rewardsCelebrations?.part3?.q5.answers.a1[3].unit
          ),
          img3,
        ],
        a4: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a1[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a1[4].value +
              rewardsCelebrations?.part3?.q5.answers.a1[4].unit
          ),
          img4,
        ],
      },
    },
    CARD5: {
      title: 'QUARTERLY OWNER‘S REWARD CELEBRATION',
      image: rewardsCelebrations?.part4?.q6?.answers[0],
    },
    CARD6: {
      title:
        'OWNER - How I will know my personal priorities achieved for this quarter?',
      headers: [
        {
          label: 'KPI',
          width: '100px',
        },
        {
          label: 'Measure (in $, % or #)',
          width: '80px',
        },
        {
          label: 'Timing',
          width: '70px',
        },
      ],
      rows: {
        a1: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a2[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a2[1].value +
              rewardsCelebrations?.part3?.q5.answers.a2[1].unit
          ),
          img1,
        ],
        a2: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a2[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a2[2].value +
              rewardsCelebrations?.part3?.q5.answers.a2[2].unit
          ),
          img2,
        ],
        a3: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a2[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a2[3].value +
              rewardsCelebrations?.part3?.q5.answers.a2[3].unit
          ),
          img3,
        ],
        a4: [
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a2[0]
          ),
          handleUndefined(
            'rewardsCelebrations',
            rewardsCelebrations?.part3?.q5.answers.a2[4].value +
              rewardsCelebrations?.part3?.q5.answers.a2[4].unit
          ),
          img4,
        ],
      },
    },
    CARD7: {
      title: 'TEAM - How I will know my team achieved their annually goals?',
      headers: [
        {
          label: 'KPI',
          width: '100px',
        },
        {
          label: 'Measure (in $, % or #)',
          width: '80px',
        },
        {
          label: 'Timing',
          width: '70px',
        },
      ],
      rows: {
        a1: [
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a1[0]
          ),
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a1[1] +
              visionOfSuccess?.part4?.q10.answers.a1[2]
          ),
          img1,
        ],
        a2: [
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a2[0]
          ),
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a2[1] +
              visionOfSuccess?.part4?.q10.answers.a2[2]
          ),
          img2,
        ],
        a3: [
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a3[0]
          ),
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a3[1] +
              visionOfSuccess?.part4?.q10.answers.a3[2]
          ),
          img3,
        ],
        a4: [
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a4[0]
          ),
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a4[1] +
              visionOfSuccess?.part4?.q10.answers.a4[2]
          ),
          img4,
        ],
      },
    },
    CARD8: {
      title: 'ANNUALLY TEAM REWARD CELEBRATION',
      image: visionOfSuccess?.part4?.q11?.answers[0],
    },
    CARD9: {
      title:
        'OWNER - How I will know my personal priorities achieved for this annual?',
      headers: [
        {
          label: 'KPI',
          width: '100px',
        },
        {
          label: 'Measure (in $, % or #)',
          width: '80px',
        },
        {
          label: 'Timing',
          width: '70px',
        },
      ],
      rows: {
        a1: [
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a1[3]
          ),
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a1[4] +
              visionOfSuccess?.part4?.q10.answers.a1[5]
          ),
          img1,
        ],
        a2: [
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a2[3]
          ),
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a2[4] +
              visionOfSuccess?.part4?.q10.answers.a2[5]
          ),
          img2,
        ],
        a3: [
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a3[3]
          ),
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a3[4] +
              visionOfSuccess?.part4?.q10.answers.a3[5]
          ),
          img3,
        ],
        a4: [
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a4[3]
          ),
          handleUndefined(
            'visionOfSuccess',
            visionOfSuccess?.part4?.q10.answers.a4[4] +
              visionOfSuccess?.part4?.q10.answers.a4[5]
          ),
          img4,
        ],
      },
    },
  };
}
