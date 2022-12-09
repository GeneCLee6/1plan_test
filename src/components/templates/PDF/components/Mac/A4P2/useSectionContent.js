import React, { useContext } from 'react';
import { SectionsContext } from 'contexts/SectionsProvider';
import { digitReducer } from 'utils/numbers';
import moment from 'moment';
export default function useSectionContent() {
  const {
    contextValue: { quickStart, rewardsCelebrations, visionOfSuccess, numbers },
  } = useContext(SectionsContext);

  function handleUndefined(x, session) {
    if (Object.keys(session).length > 2) {
      if (x) {
        return x;
      } else {
        return '';
      }
    }
  }

  return {
    getSection1Content: () => {
      if (quickStart?.part1?.q1 != undefined) {
        return quickStart?.part1?.q1?.answers.filter((a) => a.trim());
      } else {
        return ['', '', '', ''];
      }
    },

    getSection2Content: () => {
      if (quickStart?.part3?.q11 != undefined) {
        console.log(quickStart?.part3?.q11);
        return quickStart?.part3?.q11;
      } else {
        return '';
      }
    },
    //  {
    // 	const imageLink = ;
    // 	console.log(imageLink);
    // 	// const response = await fetch(imageLink, { mode: 'no-cors' });
    // 	// const blob = await response.blob();

    // 	// const url = URL.createObjectURL(blob.slice(0, 4000));
    // 	// console.log(url);
    // 	// return url;
    // 	return imageLink;
    // },
    getSection3Content: () => {
      if (quickStart?.part2?.q2 != undefined) {
        const { a1, a2, a3, a4, a5 } = quickStart?.part2?.q2?.answers;
        return [a1, a2, a3, a4, a5];
      } else {
        return ['', '', '', '', ''];
      }
    },
    getSection4Content: () => {
      if (
        numbers?.page2?.q3 != undefined &&
        numbers?.page2?.q4 != undefined &&
        numbers?.page2?.q5 != undefined &&
        numbers?.page3?.q6 != undefined &&
        numbers?.page4?.q8 != undefined &&
        numbers?.page4?.q9 != undefined &&
        numbers?.page5?.q10 != undefined &&
        numbers?.page6?.q13 != undefined &&
        numbers?.page5?.q11 != undefined &&
        numbers?.page2?.q4 != undefined &&
        numbers?.page1?.q1 != undefined &&
        numbers?.page2?.q3 != undefined &&
        numbers?.page5?.q12 != undefined &&
        numbers?.page6?.q13 != undefined
      ) {
        const { q3, q4, q5 } = numbers?.page2;
        const revenue = q3[0] * q4[0] * q5[0];
        const marketingSpend = revenue * numbers?.page3?.q6[0] * 0.01;
        const costOfGoods = revenue * numbers?.page4?.q8[0] * 0.01;
        const directLabour = revenue * numbers?.page4?.q9[0] * 0.01;
        const overheadOfSales = revenue * numbers?.page5?.q10[0] * 0.01;
        const ebit =
          revenue -
          marketingSpend -
          costOfGoods -
          directLabour -
          overheadOfSales;
        const yearOfPlan = +visionOfSuccess?.part1?.q1.answers[0].split(' ')[0];
        const ownerHourRate = (
          revenue /
          +numbers?.page6?.q13[0] /
          +numbers?.page5?.q11[0] /
          52
        ).toFixed();
        const grossProfitSales =
          revenue - marketingSpend - costOfGoods - directLabour;
        const ownerWorkedHour = numbers?.page5?.q11[0];

        const avgSales = numbers?.page2?.q4[0];
        return {
          yearEnding: moment.unix(numbers?.page1?.q1.seconds).format('YYYY'),
          noClient: numbers?.page2?.q3[0],
          numberOfOwners: numbers?.page6?.q13[0],
          avgSales: `$${digitReducer(avgSales)}`,
          revenue: digitReducer(revenue),
          marketingSpend: [
            digitReducer(marketingSpend),
            digitReducer(+numbers?.page3?.q6[0]),
          ],
          costOfGoods: [
            digitReducer(costOfGoods),
            digitReducer(+numbers?.page4?.q8[0]),
          ],
          directLabour: [
            digitReducer(directLabour.toFixed(2)),
            digitReducer(+numbers?.page4?.q9[0].toFixed(2)),
          ],
          grossProfitSales: [
            digitReducer(grossProfitSales),
            digitReducer((grossProfitSales / avgSales) * 100),
          ],
          overheadOfSales: [
            digitReducer(overheadOfSales),
            digitReducer(numbers?.page5?.q10[0]),
          ],
          ebit: `$${digitReducer(ebit)}`,
          ownerProfit: [
            `${ownerWorkedHour} hrs`,
            `$${digitReducer(ownerHourRate * ownerWorkedHour)}`,
          ],
          numberOfStaff: digitReducer(numbers?.page5?.q12[0]),
          custRetentionRate: digitReducer(numbers?.page6?.q14[0]),
          newCustomers: digitReducer(numbers?.page6?.q15),
          revStaff: `$${digitReducer(revenue / numbers?.page5?.q12[0])}`,
          ownerHourRate: digitReducer(ownerHourRate),
          custAcqtCost: `$${digitReducer(
            (marketingSpend / numbers?.page6?.q15) * 4 * yearOfPlan
          )}`,
        };
      } else {
        return {
          yearEnding: '', //moment.unix(numbers?.page1?.q1.seconds).format('YYYY'),
          noClient: '', //numbers?.page2?.q3[0],
          numberOfOwners: '', //numbers?.page6?.q13[0],
          avgSales: '', //`$${digitReducer(avgSales)}`,
          revenue: '', // digitReducer(revenue),
          marketingSpend: [
            '', //digitReducer(marketingSpend),
            '', //digitReducer(+numbers?.page3?.q6[0]),
          ],
          costOfGoods: [
            '', // digitReducer(costOfGoods),
            '', //digitReducer(+numbers?.page4?.q8[0]),
          ],
          directLabour: [
            '', // digitReducer(directLabour.toFixed(2)),
            '', // digitReducer(+numbers?.page4?.q9[0].toFixed(2)),
          ],
          grossProfitSales: [
            '', //digitReducer(grossProfitSales),
            '', // digitReducer((grossProfitSales / avgSales) * 100),
          ],
          overheadOfSales: [
            '', //digitReducer(overheadOfSales),
            '', //digitReducer(numbers?.page5?.q10[0]),
          ],
          ebit: '', //`$${digitReducer(ebit)}`,
          ownerProfit: [
            '', //`${ownerWorkedHour} hrs`,
            '', //`$${digitReducer(ownerHourRate * ownerWorkedHour)}`,
          ],
          numberOfStaff: '', //digitReducer(numbers?.page5?.q12[0]),
          custRetentionRate: '', // digitReducer(numbers?.page6?.q14[0]),
          newCustomers: '', //digitReducer(numbers?.page6?.q15),
          revStaff: '', //`$${digitReducer(revenue / numbers?.page5?.q12[0])}`,
          ownerHourRate: '', //digitReducer(ownerHourRate),
          custAcqtCost: '',
          // custAcqtCost: `$${digitReducer(
          //   (marketingSpend / numbers?.page6?.q15) * 4 * yearOfPlan
          // )}`,
        };
      }
    },
    getSection5Content: () => {
      if (quickStart?.part2?.q3 !== undefined) {
        const { a1, a2, a3, a4, a5 } = quickStart?.part2?.q3.answers;
        return [a1, a2, a3, a4, a5].map((c) => {
          const s1 = c[0];
          const s2 = `${c[1]} ${
            c[2]?.seconds ? moment.unix(c[2].seconds).format('DD/MM/YYYY') : ''
          }`;

          return [s1, s2];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },
    getSection6Content: () => {
      if (quickStart?.part2?.q4 !== undefined) {
        const { a1, a2, a3, a4 } = quickStart?.part2?.q4.answers;
        return [a1, a2, a3, a4, ['', '', '']].map((c) => {
          const s1 = c[0];
          const s2 = `${c[1]} ${
            c[2]?.seconds ? moment.unix(c[2].seconds).format('DD/MM/YYYY') : ''
          }`;

          return [s1, s2];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },
    getSection7Content: () => {
      if (quickStart?.part2?.q5 !== undefined) {
        const { a1, a2, a3, a4 } = quickStart?.part2?.q5.answers;
        return [a1, a2, a3, a4, ['', '', '']].map((c) => {
          const s1 = c[0];
          const s2 = c[1] ? `$${digitReducer(c[1])}` : '';
          const s3 = c[2]?.seconds
            ? moment.unix(c[2].seconds).format('DD/MM/YYYY')
            : '';

          return [s1, s2, s3];
        });
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
    getSection8Content: () => {
      if (quickStart?.part2?.q6 !== undefined) {
        const { a1, a2, a3, a4 } = quickStart?.part2?.q6.answers;
        return [a1, a2, a3, a4, ['', '', '']].map((c) => {
          const s1 = c[0];
          const s2 = c[1] ? `$${digitReducer(c[1])}` : '';
          const s3 = c[2]?.seconds
            ? moment.unix(c[2].seconds).format('DD/MM/YYYY')
            : '';

          return [s1, s2, s3];
        });
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
    getSection9Content: () => {
      if (quickStart?.part2?.q7 !== undefined) {
        const { a1, a2, a3, a4 } = quickStart?.part2?.q7.answers;
        return [a1, a2, a3, a4, ['', '', '']].map((c) => {
          const s1 = c[0];
          const s2 = c[1] ? `$${digitReducer(c[1])}` : '';
          const s3 = c[2]?.seconds
            ? moment.unix(c[2].seconds).format('DD/MM/YYYY')
            : '';

          return [s1, s2, s3];
        });
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
    getSection10Content: () => {
      if (rewardsCelebrations?.part1?.q2 !== undefined) {
        const a1 = rewardsCelebrations?.part1?.q2?.answers?.a1;
        const [i0, i1, i2, i3, i4] = a1;
        return [i1, i2, i3, i4].map(({ unit, value }, i) => [
          i0,
          `${value} ${unit}`,
          'assets/images/party.png',
        ]);
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
    getSection11Content: () => {
      return rewardsCelebrations?.part2?.q3?.answers[0];
    },
    getSection12Content: () => {
      if (rewardsCelebrations?.part1?.q2 !== undefined) {
        const a2 = rewardsCelebrations?.part1?.q2?.answers?.a2;
        const [i0, i1, i2, i3, i4] = a2;
        return [i1, i2, i3, i4].map(({ unit, value }, i) => [
          i0,
          `${value} ${unit}`,
          'assets/images/party.png',
        ]);
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
    getSection13Content: () => {
      if (rewardsCelebrations?.part3?.q5 !== undefined) {
        const a1 = rewardsCelebrations?.part3?.q5?.answers?.a1;
        const [i0, i1, i2, i3, i4] = a1;
        return [i1, i2, i3, i4].map(({ unit, value }, i) => [
          i0,
          `${value} ${unit}`,
          'assets/images/party.png',
        ]);
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
    getSection14Content: () => {
      return rewardsCelebrations?.part4?.q6?.answers[0];
    },
    getSection15Content: () => {
      if (rewardsCelebrations?.part3?.q5 !== undefined) {
        const a2 = rewardsCelebrations?.part3?.q5?.answers?.a2;
        const [i0, i1, i2, i3, i4] = a2;
        return [i1, i2, i3, i4].map(({ unit, value }, i) => [
          i0,
          `${value} ${unit}`,
          'assets/images/party.png',
        ]);
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
    getSection16Content: () => {
      if (visionOfSuccess?.part4?.q10 !== undefined) {
        const { a1, a2, a3, a4 } = visionOfSuccess?.part4?.q10?.answers;
        return [a1, a2, a3, a4].map(([i0, i1, i2], i) => [
          i0,
          `${i1} ${i2}`,
          'assets/images/party.png',
        ]);
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
    getSection17Content: () => {
      return visionOfSuccess?.part4?.q11?.answers[0];
    },
    getSection18Content: () => {
      if (visionOfSuccess?.part4?.q10 !== undefined) {
        const { a1, a2, a3, a4 } = visionOfSuccess?.part4?.q10?.answers;
        return [a1, a2, a3, a4].map(([i0, i1, i2, i3, i4, i5], i) => [
          i3,
          `${i4} ${i5}`,
          'assets/images/party.png',
        ]);
      } else {
        return [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
      }
    },
  };
}
