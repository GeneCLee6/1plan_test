import React, { useContext, useEffect, useState } from 'react';
import { SectionsContext } from 'contexts/SectionsProvider';
import { digitReducer } from 'utils/numbers';
import moment from 'moment';
import { UserContext } from 'contexts/UserProvider';
import { getDocByRef } from 'services/firestore';
import { MULTIPLES } from 'utils/constants';
export default function useSectionContent() {
  const {
    contextValue: { strengthsOpportunities, visionOfSuccess, numbers },
  } = useContext(SectionsContext);
  const {
    contextValue: { user },
  } = useContext(UserContext);

  const [plan, setPlan] = useState({});

  useEffect(() => {
    const loadPlan = async () => {
      const planRef = user?.company?.planRef;
      const plan = await getDocByRef(planRef);
      setPlan(plan);
    };
    loadPlan();
  }, []);

  return {
    getSection7Content: () => {
      if (plan?.settings) {
        if (Object.keys(numbers).length > 2) {
          const { industryCode } = plan?.settings;
          const multiple = MULTIPLES[industryCode];

          const xYear = visionOfSuccess?.part1?.q1?.answers[0].split(' ')[0];
          const { q3, q4, q5 } = numbers?.page2;

          const valuation = [
            '90 days',
            'Year 1',
            'Year 3',
            `Year ${xYear}`,
          ].map((year, i) => {
            const revenue = q3[i] * q4[i] * q5[i];
            const marketingSpend = revenue * numbers?.page3?.q6[i] * 0.01;
            const costOfGoods = revenue * numbers?.page4?.q8[i] * 0.01;
            const directLabour = revenue * numbers?.page4?.q9[i] * 0.01;
            const overheadOfSales = revenue * numbers?.page5?.q10[i] * 0.01;
            const ebit =
              revenue -
              marketingSpend -
              costOfGoods -
              directLabour -
              overheadOfSales;
            let valuation = multiple * ebit;
            if (i === 0) valuation *= 4;
            return [year, multiple, `$${digitReducer(valuation)}`];
          });
          return valuation;
        } else {
          return [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
          ];
        }
      }
      return [
        ['90 days', '2.5', ''],
        ['Year 1', '2.5', ''],
        ['Year 3', '2.5', ''],
        [
          `Year ${visionOfSuccess?.part1?.q1?.answers[0].split(' ')[0]}`,
          '2.5',
          '',
        ],
      ];
    },
    getSection8Content: () => {
      if (Object.keys(numbers).length > 2) {
        const { q3, q4, q5 } = numbers?.page2;
        const revenue = q3[3] * q4[3] * q5[3];
        const marketingSpend = revenue * numbers?.page3?.q6[3] * 0.01;
        const costOfGoods = revenue * numbers?.page4?.q8[3] * 0.01;
        const directLabour = revenue * numbers?.page4?.q9[3] * 0.01;
        const overheadOfSales = revenue * numbers?.page5?.q10[3] * 0.01;
        const ebit =
          revenue -
          marketingSpend -
          costOfGoods -
          directLabour -
          overheadOfSales;
        const yearOfPlan = +visionOfSuccess?.part1?.q1.answers[0].split(' ')[0];
        const ownerHourRate = (
          revenue /
          +numbers?.page6?.q13[3] /
          +numbers?.page5?.q11[3] /
          52
        ).toFixed();
        const ownerWorkedHour = numbers?.page5?.q11[3];
        const grossProfitSales =
          revenue - marketingSpend - costOfGoods - directLabour;
        const avgSales = numbers?.page2?.q4[3];
        return {
          yearEnding: moment.unix(numbers?.page1?.q1.seconds).format('YYYY'),
          noClient: numbers?.page2?.q3[3],
          numberOfOwners: numbers?.page6?.q13[3],
          avgSales: `$${digitReducer(avgSales)}`,
          revenue: digitReducer(revenue),
          marketingSpend: [
            digitReducer(marketingSpend),
            digitReducer(+numbers?.page3?.q6[3]),
          ],
          costOfGoods: [
            digitReducer(costOfGoods),
            digitReducer(+numbers?.page4?.q8[3]),
          ],
          directLabour: [
            digitReducer(directLabour),
            digitReducer(+numbers?.page4?.q9[3]),
          ],
          grossProfitSales: [
            digitReducer(grossProfitSales),
            digitReducer((grossProfitSales / avgSales) * 100),
          ],
          overheadOfSales: [
            digitReducer(overheadOfSales),
            digitReducer(numbers?.page5?.q10[3]),
          ],
          ebit: `$${digitReducer(ebit)}`,
          ownerProfit: [
            `${ownerWorkedHour} hrs`,
            `$${digitReducer(ownerHourRate * ownerWorkedHour)}`,
          ],
          numberOfStaff: digitReducer(numbers?.page5?.q12[3]),
          custRetentionRate: digitReducer(numbers?.page6?.q14[3]),
          newCustomers: digitReducer(numbers?.page6?.q15),
          revStaff: `$${digitReducer(revenue / numbers?.page5?.q12[3])}`,
          ownerHourRate: digitReducer(ownerHourRate),
          custAcqtCost: `$${digitReducer(
            (marketingSpend / numbers?.page6?.q15) * 4 * yearOfPlan
          )}`,
        };
      } else {
        return {
          yearEnding: '', //moment.unix(numbers?.page1?.q1.seconds).format('YYYY'),
          noClient: '', //numbers?.page2?.q3[3],
          numberOfOwners: '', //numbers?.page6?.q13[3],
          avgSales: '', // `$${digitReducer(avgSales)}`,
          revenue: '', //digitReducer(revenue),
          marketingSpend: [
            '', //digitReducer(marketingSpend),
            '', //digitReducer(+numbers?.page3?.q6[3]),
          ],
          costOfGoods: [
            '', //digitReducer(costOfGoods),
            '', //digitReducer(+numbers?.page4?.q8[3]),
          ],
          directLabour: [
            '', //digitReducer(directLabour),
            '', //digitReducer(+numbers?.page4?.q9[3]),
          ],
          grossProfitSales: [
            '', //digitReducer(grossProfitSales),
            '', //digitReducer((grossProfitSales / avgSales) * 100),
          ],
          overheadOfSales: [
            '', //digitReducer(overheadOfSales),
            '', //digitReducer(numbers?.page5?.q10[3]),
          ],
          ebit: '', //`$${digitReducer(ebit)}`,
          ownerProfit: [
            '', //`${ownerWorkedHour} hrs`,
            '', //`$${digitReducer(ownerHourRate * ownerWorkedHour)}`,
          ],
          numberOfStaff: '', //digitReducer(numbers?.page5?.q12[3]),
          custRetentionRate: '', // digitReducer(numbers?.page6?.q14[3]),
          newCustomers: '', // digitReducer(numbers?.page6?.q15),
          revStaff: '', //`$${digitReducer(revenue / numbers?.page5?.q12[3])}`,
          ownerHourRate: '', // digitReducer(ownerHourRate),
          custAcqtCost: '',
          // custAcqtCost: `$${digitReducer(
          // 	(marketingSpend / numbers?.page6?.q15) * 4 * yearOfPlan
          // )}`,
        };
      }
    },
    getSection9Content: () => {
      if (Object.keys(numbers).length > 2) {
        const { q3, q4, q5 } = numbers?.page2;
        const revenue = q3[2] * q4[2] * q5[2];
        const marketingSpend = revenue * numbers?.page3?.q6[2] * 0.01;
        const costOfGoods = revenue * numbers?.page4?.q8[2] * 0.01;
        const directLabour = revenue * numbers?.page4?.q9[2] * 0.01;
        const overheadOfSales = revenue * numbers?.page5?.q10[2] * 0.01;
        const ebit =
          revenue -
          marketingSpend -
          costOfGoods -
          directLabour -
          overheadOfSales;
        const yearOfPlan = +visionOfSuccess?.part1?.q1.answers[0].split(' ')[0];
        const ownerHourRate = (
          revenue /
          +numbers?.page6?.q13[2] /
          +numbers?.page5?.q11[2] /
          52
        ).toFixed();
        const grossProfitSales =
          revenue - marketingSpend - costOfGoods - directLabour;
        const ownerWorkedHour = numbers?.page5?.q11[2];

        const avgSales = numbers?.page2?.q4[2];
        return {
          yearEnding: moment.unix(numbers?.page1?.q1.seconds).format('YYYY'),
          noClient: numbers?.page2?.q3[2],
          numberOfOwners: numbers?.page6?.q13[2],
          avgSales: `$${digitReducer(avgSales)}`,
          revenue: digitReducer(revenue),
          marketingSpend: [
            digitReducer(marketingSpend),
            digitReducer(+numbers?.page3?.q6[2]),
          ],
          costOfGoods: [
            digitReducer(costOfGoods),
            digitReducer(+numbers?.page4?.q8[2]),
          ],
          directLabour: [
            digitReducer(directLabour),
            digitReducer(+numbers?.page4?.q9[2]),
          ],
          grossProfitSales: [
            digitReducer(grossProfitSales),
            digitReducer((grossProfitSales / avgSales) * 100),
          ],
          overheadOfSales: [
            digitReducer(overheadOfSales),
            digitReducer(numbers?.page5?.q10[2]),
          ],
          ebit: `$${digitReducer(ebit)}`,
          ownerProfit: [
            `${ownerWorkedHour} hrs`,
            `$${digitReducer(ownerHourRate * ownerWorkedHour)}`,
          ],
          numberOfStaff: digitReducer(numbers?.page5?.q12[2]),
          custRetentionRate: digitReducer(numbers?.page6?.q14[2]),
          newCustomers: digitReducer(numbers?.page6?.q15),
          revStaff: `$${digitReducer(revenue / numbers?.page5?.q12[2])}`,
          ownerHourRate: digitReducer(ownerHourRate),
          custAcqtCost: `$${digitReducer(
            (marketingSpend / numbers?.page6?.q15) * 4 * yearOfPlan
          )}`,
        };
      } else {
        return {
          yearEnding: '', //moment.unix(numbers?.page1?.q1.seconds).format('YYYY'),
          noClient: '', //numbers?.page2?.q3[2],
          numberOfOwners: '', //numbers?.page6?.q13[2],
          avgSales: '', //`$${digitReducer(avgSales)}`,
          revenue: '', //digitReducer(revenue),
          marketingSpend: [
            '', //digitReducer(marketingSpend),
            '', //digitReducer(+numbers?.page3?.q6[2]),
          ],
          costOfGoods: [
            '', //digitReducer(costOfGoods),
            '', //digitReducer(+numbers?.page4?.q8[2]),
          ],
          directLabour: [
            '', //digitReducer(directLabour),
            '', //digitReducer(+numbers?.page4?.q9[2]),
          ],
          grossProfitSales: [
            '', //digitReducer(grossProfitSales),
            '', //digitReducer((grossProfitSales / avgSales) * 100),
          ],
          overheadOfSales: [
            '', //digitReducer(overheadOfSales),
            '', //digitReducer(numbers?.page5?.q10[2]),
          ],
          ebit: '', //`$${digitReducer(ebit)}`,
          ownerProfit: [
            '', //`${ownerWorkedHour} hrs`,
            '', //`$${digitReducer(ownerHourRate * ownerWorkedHour)}`,
          ],
          numberOfStaff: '', //digitReducer(numbers?.page5?.q12[2]),
          custRetentionRate: '', // digitReducer(numbers?.page6?.q14[2]),
          newCustomers: '', //digitReducer(numbers?.page6?.q15),
          revStaff: '', //`$${digitReducer(revenue / numbers?.page5?.q12[2])}`,
          ownerHourRate: '', //digitReducer(ownerHourRate),
          custAcqtCost: '',
          // custAcqtCost: `$${digitReducer(
          // 	(marketingSpend / numbers?.page6?.q15) * 4 * yearOfPlan
          // )}`,
        };
      }
    },
    getSection10Content: () => {
      if (Object.keys(numbers).length > 2) {
        const { q3, q4, q5 } = numbers?.page2;
        const revenue = q3[1] * q4[1] * q5[1];
        const marketingSpend = revenue * numbers?.page3?.q6[1] * 0.01;
        const costOfGoods = revenue * numbers?.page4?.q8[1] * 0.01;
        const directLabour = revenue * numbers?.page4?.q9[1] * 0.01;
        const overheadOfSales = revenue * numbers?.page5?.q10[1] * 0.01;
        const ebit =
          revenue -
          marketingSpend -
          costOfGoods -
          directLabour -
          overheadOfSales;
        const yearOfPlan = +visionOfSuccess?.part1?.q1.answers[0].split(' ')[0];
        const ownerHourRate = (
          revenue /
          +numbers?.page6?.q13[1] /
          +numbers?.page5?.q11[1] /
          52
        ).toFixed();
        const grossProfitSales =
          revenue - marketingSpend - costOfGoods - directLabour;
        const ownerWorkedHour = numbers?.page5?.q11[1];

        const avgSales = numbers?.page2?.q4[1];
        return {
          yearEnding: moment.unix(numbers?.page1?.q1.seconds).format('YYYY'),
          noClient: numbers?.page2?.q3[1],
          numberOfOwners: numbers?.page6?.q13[1],
          avgSales: `$${digitReducer(avgSales)}`,
          revenue: digitReducer(revenue),
          marketingSpend: [
            digitReducer(marketingSpend),
            digitReducer(+numbers?.page3?.q6[1]),
          ],
          costOfGoods: [
            digitReducer(costOfGoods),
            digitReducer(+numbers?.page4?.q8[1]),
          ],
          directLabour: [
            digitReducer(directLabour),
            digitReducer(+numbers?.page4?.q9[1]),
          ],
          grossProfitSales: [
            digitReducer(grossProfitSales),
            digitReducer((grossProfitSales / avgSales) * 100),
          ],
          overheadOfSales: [
            digitReducer(overheadOfSales),
            digitReducer(numbers?.page5?.q10[1]),
          ],
          ebit: `$${digitReducer(ebit)}`,
          ownerProfit: [
            `${ownerWorkedHour} hrs`,
            `$${digitReducer(ownerHourRate * ownerWorkedHour)}`,
          ],
          numberOfStaff: digitReducer(numbers?.page5?.q12[1]),
          custRetentionRate: digitReducer(numbers?.page6?.q14[1]),
          newCustomers: digitReducer(numbers?.page6?.q15),
          revStaff: `$${digitReducer(revenue / numbers?.page5?.q12[1])}`,
          ownerHourRate: digitReducer(ownerHourRate),
          custAcqtCost: `$${digitReducer(
            (marketingSpend / numbers?.page6?.q15) * 4 * yearOfPlan
          )}`,
        };
      } else {
        return {
          yearEnding: '', //moment.unix(numbers?.page1?.q1.seconds).format('YYYY'),
          noClient: '', //numbers?.page2?.q3[1],
          numberOfOwners: '', //numbers?.page6?.q13[1],
          avgSales: '', //`$${digitReducer(avgSales)}`,
          revenue: '', // digitReducer(revenue),
          marketingSpend: [
            '', //digitReducer(marketingSpend),
            '', //digitReducer(+numbers?.page3?.q6[1]),
          ],
          costOfGoods: [
            '', //digitReducer(costOfGoods),
            '', //digitReducer(+numbers?.page4?.q8[1]),
          ],
          directLabour: [
            '', //digitReducer(directLabour),
            '', //digitReducer(+numbers?.page4?.q9[1]),
          ],
          grossProfitSales: [
            '', //digitReducer(grossProfitSales),
            '', //digitReducer((grossProfitSales / avgSales) * 100),
          ],
          overheadOfSales: [
            '', //digitReducer(overheadOfSales),
            '', //digitReducer(numbers?.page5?.q10[1]),
          ],
          ebit: '', //`$${digitReducer(ebit)}`,
          ownerProfit: [
            '', //`${ownerWorkedHour} hrs`,
            '', //`$${digitReducer(ownerHourRate * ownerWorkedHour)}`,
          ],
          numberOfStaff: '', //digitReducer(numbers?.page5?.q12[1]),
          custRetentionRate: '', //digitReducer(numbers?.page6?.q14[1]),
          newCustomers: '', //digitReducer(numbers?.page6?.q15),
          revStaff: '', //`$${digitReducer(revenue / numbers?.page5?.q12[1])}`,
          ownerHourRate: '', // digitReducer(ownerHourRate),
          custAcqtCost: '',
          // custAcqtCost: `$${digitReducer(
          // 	(marketingSpend / numbers?.page6?.q15) * 4 * yearOfPlan
          // )}`,
        };
      }
    },
    getSection12Content: () => {
      if (Object.keys(visionOfSuccess).length > 2) {
        const { a1, a2, a3, a4, a5 } = visionOfSuccess?.part3?.q8c?.answers;
        return [a1[0], a2[0], a3[0], a4[0], a5[0]];
      } else {
        return ['', '', '', '', ''];
      }
    },
    getSection13Content: () => {
      if (Object.keys(visionOfSuccess).length > 2) {
        const { a1, a2, a3, a4, a5 } = visionOfSuccess?.part3?.q8b?.answers;
        return [a1[0], a2[0], a3[0], a4[0], a5[0]];
      } else {
        return ['', '', '', '', ''];
      }
    },
    getSection14Content: () => {
      if (Object.keys(visionOfSuccess).length > 2) {
        const { a1, a2, a3, a4, a5 } = visionOfSuccess?.part3?.q8a?.answers;
        return [a1[0], a2[0], a3[0], a4[0], ''];
      } else {
        return ['', '', '', '', ''];
      }
    },
    getSection15Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { aSt1, aSt2 } = strengthsOpportunities?.part1?.q1?.answers;
        return [aSt1[0], aSt2[0]];
      } else {
        return ['', ''];
      }
    },
    getSection16Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { aSt1, aSt2 } = strengthsOpportunities?.part1?.q1?.answers;
        return [aSt1[1], aSt2[1]];
      } else {
        return ['', ''];
      }
    },
    getSection17Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { aOp1, aOp2 } = strengthsOpportunities?.part2?.q2?.answers;
        return [aOp1[0], aOp2[0]];
      } else {
        return ['', ''];
      }
    },
    getSection18Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { aOp1, aOp2 } = strengthsOpportunities?.part2?.q2?.answers;
        return [aOp1[1], aOp2[1]];
      } else {
        return ['', ''];
      }
    },
    getSection19Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { aWe1, aWe2 } = strengthsOpportunities?.part1?.q1?.answers;
        return [aWe1[0], aWe2[0]];
      } else {
        return ['', ''];
      }
    },
    getSection20Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { aWe1, aWe2 } = strengthsOpportunities?.part1?.q1?.answers;
        return [aWe1[1], aWe2[1]];
      } else {
        return ['', ''];
      }
    },
    getSection21Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { aTh1, aTh2 } = strengthsOpportunities?.part2?.q2?.answers;
        return [aTh1[0], aTh2[0]];
      } else {
        return ['', ''];
      }
    },
    getSection22Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { aTh1, aTh2 } = strengthsOpportunities?.part2?.q2?.answers;
        return [aTh1[1], aTh2[1]];
      } else {
        return ['', ''];
      }
    },

    getSection24Content: () => {
      if (
        Object.keys(strengthsOpportunities).length > 2 &&
        Object.keys(numbers).length > 2
      ) {
        const trandingDaysPerYear =
          strengthsOpportunities?.part3?.q3.answers[0] *
          strengthsOpportunities?.part3?.q3.answers[1];
        const { q3, q4, q5 } = numbers?.page2;
        const revenue = q3[1] * q4[1] * q5[1];
        const marketingSpend = revenue * numbers?.page3?.q6[1] * 0.01;
        const costOfGoods = revenue * numbers?.page4?.q8[1] * 0.01;
        const directLabour = revenue * numbers?.page4?.q9[1] * 0.01;
        const overheadOfSales = revenue * numbers?.page5?.q10[1] * 0.01;
        const ebit =
          revenue -
          marketingSpend -
          costOfGoods -
          directLabour -
          overheadOfSales;
        const banking = revenue / trandingDaysPerYear;
        const maketing = marketingSpend / trandingDaysPerYear;
        const overheadTrf = overheadOfSales / trandingDaysPerYear;
        const accumulationTrf = ebit / trandingDaysPerYear;
        return [
          ['Banking', `$${digitReducer(banking)}`],
          ['Marketing', `$${digitReducer(maketing)}`],
          ['Overhead', `$${digitReducer(overheadTrf)}`],
          ['Accumulate', `$${digitReducer(accumulationTrf)}`],
        ];
      } else {
        return [
          ['Banking', ''],
          ['Marketing', ''],
          ['Overhead', ''],
          ['Accumulate', ''],
        ];
      }
    },
    getSection25Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { a1, a2, a3, a4 } = strengthsOpportunities?.part3?.q4?.answers;

        return [a1, a2, a3, a4].map((a) => {
          const s1 = a[0];
          const s2 = a[2];
          return [[s1], [s2]];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },
    getSection26Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const { a1, a2, a3, a4 } = strengthsOpportunities?.part3?.q4?.answers;

        return [a1, a2, a3, a4].map((a) => {
          const s1 = a[0];
          const s2 = a[2];
          return [[s1], [s2]];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },
    getSection27Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const [a1, a2, a3, a4] = strengthsOpportunities?.part3?.q6?.answers;
        return [
          ['Earned laster financial year', digitReducer(a1)],
          ['Target inc/dec this year', digitReducer(a2)],
          ['Dividend/Bonus', digitReducer(a3)],
          ['Hours work', digitReducer(a4)],
        ];
      } else {
        return [
          ['Earned laster financial year', ' '],
          ['Target inc/dec this year', ' '],
          ['Dividend/Bonus', ' '],
          ['Hours work', ''],
        ];
      }
    },
    getSection28Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const q8Answers = Object.values(
          strengthsOpportunities?.part3?.q8?.answers
        );
        return q8Answers.map((a) => {
          const s1 = a[0];
          const s2 = a[1];
          return [[s1], [s2]];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },
    getSection29Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const q9Answers = Object.values(
          strengthsOpportunities?.part3?.q9?.answers
        );

        return q9Answers.map((a) => {
          const s1 = a[0];
          const s2 = a[1];
          return [[s1], [s2]];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },

    getSection30Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const q10Answers = Object.values(
          strengthsOpportunities?.part3?.q10?.answers
        );
        console.log(strengthsOpportunities?.part3?.q10?.answers.a1[0]);
        return q10Answers.map((a) => {
          const s1 = a[0];
          const s2 = a[1];
          return [[s1], [s2]];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },
    getSection31Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const q11Answers = Object.values(
          strengthsOpportunities?.part3?.q11?.answers
        );

        return q11Answers.map((a) => {
          const s1 = a[0];
          const s2 = a[2].trim() == '' ? a[1] : a[2];
          return [[s1], [s2]];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },
    getSection32Content: () => {
      if (Object.keys(strengthsOpportunities).length > 2) {
        const q12Answers = Object.values(
          strengthsOpportunities?.part3?.q12?.answers
        );

        return q12Answers.map((a) => {
          const s1 = a[0];
          const s2 = a[2].trim() == '' ? a[1] : a[2];
          return [[s1], [s2]];
        });
      } else {
        return [
          ['', ''],
          ['', ''],
          ['', ''],
          ['', ''],
        ];
      }
    },
  };
}
