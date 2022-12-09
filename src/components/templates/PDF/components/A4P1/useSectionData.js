import { useContext } from 'react';
import { SectionsContext } from 'contexts/SectionsProvider';
import useSectionContent from './useSectionContent';
export default function useSectionData() {
  const {
    contextValue: { strengthsOpportunities, visionOfSuccess },
  } = useContext(SectionsContext);

  const content = useSectionContent();

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
    section1: {
      headerTitle: 'VISION',
      subHeaderTitle: 'What are we striving to become?',
      content: visionOfSuccess?.part1?.q3?.answers,
      // 'Being the go to supplier that is robust, proactive and trend setting',
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        subheader: {
          background: 'rgba(123, 97, 255, 0.1)',
        },
      },
    },
    section2: {
      headerTitle: 'PURPOSE',
      subHeaderTitle: 'Why do we do this?',
      content: visionOfSuccess?.part1?.q2?.answers,
      // 'Being involved in an environment and community that people enjoy working for and being apart while leaving a footprint in our drive to tackle childhood obesity ...',
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        subheader: {
          background: 'rgba(123, 97, 255, 0.1)',
        },
      },
    },
    section3: {
      headerTitle: 'MISSION STATEMENT',
      subHeaderTitle: 'What do we do everyday to meet vision',
      content: visionOfSuccess?.part1?.q4?.answers?.a1,
      // 'Every day we help improve the lives of individuals by ensuring we supply our customers with the best foods on the market. We do this by:',
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        subheader: {
          background: 'rgba(123, 97, 255, 0.1)',
        },
      },
    },
    section4: {
      headerTitle: 'LOOKS LIKE',
      subHeaderTitle: 'What does my business look like',
      content: visionOfSuccess?.part2?.q6?.answers.filter((a, i) => i < 3),
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        subHeader: {
          background: 'rgba(123, 97, 255, 0.1)',
          height: '62px',
          fontSize: '9px',
        },
        container: {
          height: '182px',
        },
        contentTrDiv: {
          height: '30px',
          fontSize: '8px',
        },
      },
    },
    section5: {
      headerTitle: 'THE BRAND PROMISES',
      subHeaderTitle: 'What will we stand and be know for',
      content: visionOfSuccess?.part2?.q7?.answers.filter((a, i) => i <= 3),
      // [
      // 	'Find best performing brands and',
      // 	'Commence and trial own home brand product',
      // 	'Expand home brand product and work on',
      // 	'',
      // 	'',
      // ],
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        subHeader: {
          background: 'rgba(123, 97, 255, 0.1)',
          fontSize: '8px',
          minHeight: '38px',
        },
        container: {
          height: '182px',
        },
        contentTrDiv: {
          height: '25px',
          padding: '3px 8px',
          fontSize: '8px',
        },
      },
    },
    section6: {
      headerTitle: 'MISSION ACTION',
      subHeaderTitle: 'What we do every day to align with our mission?',
      content: visionOfSuccess?.part1?.q4?.answers?.a2?.filter((a, i) => i < 3),
      //  [
      // 	'Find best performing brands and',
      // 	'Commence and trial own home brand product',
      // 	'Expand home brand product and work on',
      // 	'',
      // 	'',
      // ],
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        subHeader: {
          background: 'rgba(123, 97, 255, 0.1)',
          height: '48px',
          fontSize: '8px',
        },
        content: {
          fontSize: '8px',
        },
        container: {
          height: '169.5px',
        },
      },
    },
    section7: {
      headerTitle: 'VALUATION',
      subHeaderTitles: ['Year', 'Multiple', 'Valuation $'],
      content: content.getSection7Content(),
      //  [
      // 	['90 days', '2.5', ''],
      // 	['Year 1', '2.5', ''],
      // 	['Year 3', '2.5', ''],
      // 	[
      // 		`Year ${visionOfSuccess?.part1?.q1?.answers[0].split(' ')[0]}`,
      // 		'2.5',
      // 		'',
      // 	],
      // ],
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        container: {
          border: 'none',
        },
        table: {
          th: {
            height: '20px',
            fontSize: '7px',
          },
          td: {
            height: '22px',
            padding: '0 0 5px 0',
            fontSize: '8px',
          },
        },
      },
    },
    section8: {
      headerTitle: `Key Financial Targets Year ${
        visionOfSuccess?.part1?.q1?.answers[0].split(' ')[0]
      }`,
      content: content.getSection8Content(),
      // {
      // 	yearEnding: 2022,
      // 	noClient: 'N2',
      // 	numberOfOwners: 100,
      // 	avgOrder: 334,
      // 	revenue: '9.42k',
      // 	marketingSpend: ['9,036', 0.32],
      // 	costOfGoods: ['9.42k', 0.32],
      // 	directLabour: ['9.42k', 0.32],
      // 	grossProfitSales: ['9.42k', 0.32],
      // 	overheadOfSales: ['9.42k', 0.32],
      // 	ebit: '$78,343,680,000',
      // 	ownerProfit: 65,
      // 	numberOfStaff: 9,
      // 	custRetentionRate: 9,
      // 	newCustomers: 9,
      // 	revStaff: 104667,
      // 	ownerHourRate: 36,
      // 	custAcqtCost: 33,
      // },
    },
    section9: {
      headerTitle: 'Key Financial Targets Year 3',
      content: content.getSection9Content(),
      // {
      // 	yearEnding: 2022,
      // 	noClient: 'N2',
      // 	numberOfOwners: 100,
      // 	avgSales: 334,
      // 	revenue: '9.42k',
      // 	marketingSpend: ['9,036', 0.32],
      // 	costOfGoods: ['9.42k', 0.32],
      // 	directLabour: ['9.42k', 0.32],
      // 	grossProfitSales: ['9.42k', 0.32],
      // 	overheadOfSales: ['9.42k', 0.32],
      // 	ebit: '$78,343,680,000',
      // 	ownerProfit: [65, '$100k'],
      // 	numberOfStaff: 9,
      // 	custRetentionRate: 9,
      // 	newCustomers: 9,
      // 	revStaff: 104667,
      // 	ownerHourRate: 36,
      // 	custAcqtCost: 33,
      // },
    },
    section10: {
      headerTitle: 'Key Financial Targets Year 1',
      content: content.getSection10Content(),
      // {
      // 	yearEnding: 2022,
      // 	noClient: 'N2',
      // 	numberOfOwners: 100,
      // 	avgSales: 334,
      // 	revenue: '9.42k',
      // 	marketingSpend: ['9,036', 0.32],
      // 	costOfGoods: ['9.42k', 0.32],
      // 	directLabour: ['9.42k', 0.32],
      // 	grossProfitSales: ['9.42k', 0.32],
      // 	overheadOfSales: ['9.42k', 0.32],
      // 	ebit: '$78,343,680,000',
      // 	ownerProfit: [65, '$100k'],
      // 	numberOfStaff: 9,
      // 	custRetentionRate: 9,
      // 	newCustomers: 9,
      // 	revStaff: 104667,
      // 	ownerHourRate: 36,
      // 	custAcqtCost: 33,
      // },
    },
    section11: {
      headerTitle: 'OUR CORE VALUE',
      subHeaderTitle: "These don't change and are non-negotiable",
      content:
        Object.keys(visionOfSuccess).length > 2
          ? visionOfSuccess?.part1?.q5?.answers.filter((a, i) => i < 5)
          : ['', '', '', '', ''],
      // [
      // 	'Always trading with honesty, trust, and integrity',
      // 	'100% pure organic food i.e no nastys and a real food with an economic outlook',
      // 	'Being the experts and trusted advisers in health and wellness',
      // 	'Easy to deal with. Professional but casual',
      // 	'Always focusing on continuous improvement',
      // ],
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        container: {
          width: '9cm',
        },
        subHeader: {
          background: 'rgba(123, 97, 255, 0.1)',
          padding: '0 0 2px 0',
          fontSize: '8.5px',
          height: '21px',
        },
        content: {
          fontSize: '7px',
        },
      },
    },
    section12: {
      headerTitle: '5 YR PRIORITIES',
      subHeaderTitle: '',
      content: content.getSection12Content(),
      //  [
      // 	'Always trading with honesty, trust, and integrity',
      // 	'100% pure organic food i.e no nastys and a real food with an economic outlook',
      // 	'Being the experts and trusted advisers in health and wellness',
      // 	'Easy to deal with. Professional but casual',
      // 	'Always focusing on continuous improvement',
      // ],
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        container: {
          width: '9cm',
        },
        subHeader: {
          background: 'rgba(123, 97, 255, 0.1)',
          height: '22px',
        },
      },
    },
    section13: {
      headerTitle: '3 YR PRIORITIES',
      subHeaderTitle: '',
      content: content.getSection13Content(),
      // [
      // 	'Always trading with honesty, trust, and integrity',
      // 	'100% pure organic food i.e no nastys and a real food with an economic outlook',
      // 	'Being the experts and trusted advisers in health and wellness',
      // 	'Easy to deal with. Professional but casual',
      // 	'Always focusing on continuous improvement',
      // ],
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        container: {
          width: '9cm',
        },
        subHeader: {
          background: 'rgba(123, 97, 255, 0.1)',
          height: '22px',
        },
      },
    },
    section14: {
      headerTitle: 'ANNUAL PRIORITIES',
      subHeaderTitle: '',
      content: content.getSection14Content(),
      //  [
      // 	'Always trading with honesty, trust, and integrity',
      // 	'100% pure organic food i.e no nastys and a real food with an economic outlook',
      // 	'Being the experts and trusted advisers in health and wellness',
      // 	'Easy to deal with. Professional but casual',
      // 	'Always focusing on continuous improvement',
      // ],
      styles: {
        header: {
          background: 'rgba(123, 97, 255, 0.5)',
        },
        container: {
          width: '9cm',
        },
        subHeader: {
          background: 'rgba(123, 97, 255, 0.1)',
          height: '22px',
        },
      },
    },
    section15: {
      headerTitle: 'STRENGTH',
      content: content.getSection15Content(),
      // [
      // 	'Excellent name in the industry',
      // 	"We are the 'go-to' distributor for new brands",
      // ],
      styles: {
        container: {
          width: '5.5cm',
          height: '83px',
        },
        header: {
          background: 'rgba(123, 205, 190, 0.1)',
        },
        content: {
          fontSize: '8px',
        },
      },
    },
    section16: {
      headerTitle: 'How CAN I USE THIS?',
      content: content.getSection16Content(),
      //  [
      // 	'Become industry advocates for our customers',
      // 	'Continually upgrade to the fastest moving products',
      // ],
      styles: {
        container: {
          width: '5.5cm',
        },
        header: {
          background: 'rgba(123, 205, 190, 0.1)',
        },
        content: {
          fontSize: '8px',
        },
      },
    },
    section17: {
      headerTitle: 'OPPORTUNITIES',
      content: content.getSection17Content(),
      // [
      // 	'Excellent name in the industry',
      // 	"We are the 'go-to' distributor for new brands",
      // ],
      styles: {
        container: {
          width: '5.5cm',
          height: '85px',
        },
        header: {
          background: 'rgba(123, 205, 190, 0.1)',
        },
        content: {
          fontSize: '8px',
        },
      },
    },
    section18: {
      headerTitle: 'HOW TO I CAPITALISE THESE?',
      content: content.getSection18Content(),
      // [
      // 	'Become industry advocates for our customers',
      // 	'Continually upgrade to the fastest moving products',
      // ],
      styles: {
        container: {
          width: '5.5cm',
        },
        header: {
          background: 'rgba(123, 205, 190, 0.1)',
        },
        content: {
          fontSize: '8px',
        },
      },
    },
    section19: {
      headerTitle: 'WEAKNESS',
      content: content.getSection19Content(),
      // [
      // 	'Excellent name in the industry',
      // 	"We are the 'go-to' distributor for new brands",
      // ],
      styles: {
        container: {
          width: '5.5cm',
        },
        header: {
          background: 'rgba(123, 205, 190, 0.1)',
        },
        content: {
          fontSize: '8px',
        },
      },
    },
    section20: {
      headerTitle: 'How CAN I IMPROVE THIS?',
      content: content.getSection20Content(),
      // [
      // 	'Become industry advocates for our customers',
      // 	'Continually upgrade to the fastest moving products',
      // ],
      styles: {
        container: {
          width: '5.5cm',
          height: '82px',
        },
        header: {
          background: 'rgba(123, 205, 190, 0.1)',
        },
        content: {
          fontSize: '8px',
        },
      },
    },
    section21: {
      headerTitle: 'THREATS',
      content: content.getSection21Content(),
      // [
      // 	'Excellent name in the industry',
      // 	"We are the 'go-to' distributor for new brands",
      // ],
      styles: {
        container: {
          width: '5.5cm',
          height: '84px',
        },
        header: {
          background: 'rgba(123, 205, 190, 0.1)',
        },
        content: {
          fontSize: '8px',
          height: '66px',
        },
      },
    },
    section22: {
      headerTitle: 'HOW CAN I MITIGATE ON THESE?',
      content: content.getSection22Content(),
      //  [
      // 	'Become industry advocates for our customers',
      // 	'Continually upgrade to the fastest moving products',
      // ],
      styles: {
        container: {
          width: '5.5cm',
          height: '87px',
        },
        header: {
          background: 'rgba(123, 205, 190, 0.1)',
        },
        content: {
          fontSize: '8px',
        },
      },
    },
    section23: {
      headerTitle: 'TRADING DAY',
      content: [
        ['Trading day per week', strengthsOpportunities?.part3?.q3?.answers[0]],
        [
          'Trading weeks per year',
          strengthsOpportunities?.part3?.q3?.answers[1],
        ],
        [
          'Trading day per year',
          handleUndefined(
            strengthsOpportunities?.part3?.q3.answers[0] *
              strengthsOpportunities?.part3?.q3.answers[1],
            ''
          ),
        ],
        ['None trading period', strengthsOpportunities?.part3?.q3.answers[2]],
      ],
      styles: {
        table: {
          td: {
            height: '22px',
            fontSize: '8px',
          },
        },
      },
    },
    section24: {
      headerTitle: 'DAILY CASH',
      content: content.getSection24Content(),
      // [
      //   ['Banking', 5],
      //   ['Marketing', 5],
      //   ['Overhead', 5],
      //   ['Accumulate', 5],
      // ],
      styles: {
        table: {
          td: {
            height: '22px',
            fontSize: '8px',
          },
        },
      },
    },
    section25: {
      headerTitle: 'CLIENTS',
      content: content.getSection25Content(),
      // ['', '', '', ''],
      styles: {
        header: {
          padding: '6px 0',
          background: 'rgba(74, 105, 189, 0.5)',
        },
        content: {
          paddingTop: '6px',
          height: '89px',
          fontSize: '7px',
        },
        contentTrDiv: {
          padding: '0',
          height: '17px',
        },
      },
    },
    section26: {
      headerTitle: 'TEAM MEMBER',
      content: content.getSection26Content(),
      // ['', '', '', ''],
      styles: {
        header: {
          padding: '6px 0',
          background: 'rgba(74, 105, 189, 0.5)',
        },
        content: {
          paddingTop: '6px',
          height: '89px',
          fontSize: '7px',
        },
        contentTrDiv: {
          padding: '0',
          height: '17px',
        },
      },
    },
    section27: {
      headerTitle: 'OWNER & SHAREHOLDER',
      content: content.getSection27Content(),
      // [
      // 	['Earned laster financial year', '4k'],
      // 	['Target inc/dec this year', '4k'],
      // 	['Dividend/Bonus', '4k'],
      // 	['Hours work', 38],
      // ],
      styles: {
        header: {
          background: 'rgba(74, 105, 189, 0.5)',
        },
        table: {
          td: {
            height: '22px',
            fontSize: '7px',
          },
        },
      },
    },
    section28: {
      headerTitle: 'PRODUCT & SERVICE',
      content: content.getSection28Content(),
      // [
      // 	['Introducing 1 brand at $7k per month'],
      // 	['Maintaining stock items at 43 (max 50)'],
      // 	['Delete non-strategic brands under $2k p/m'],
      // 	['Stock turnover reduce from avg 37 to 30 days'],
      // ],
      styles: {
        container: {
          height: '143px',
        },
        header: {
          padding: '3px 0',
          background: 'rgba(74, 105, 189, 0.5)',
        },
        content: {
          padding: '3px 8px 13px 8px',
          height: '150px',
        },
      },
    },
    section29: {
      headerTitle: 'MARKETING',
      content: content.getSection29Content(),
      //  [
      // 	['Introducing 1 brand at $7k per month'],
      // 	['Maintaining stock items at 43 (max 50)'],
      // 	['Delete non-strategic brands under $2k p/m'],
      // 	['Stock turnover reduce from avg 37 to 30 days'],
      // ],
      styles: {
        container: {
          height: '143px',
        },
        header: {
          padding: '3px 0',
          background: 'rgba(74, 105, 189, 0.5)',
        },
        content: {
          padding: '3px 8px 13px 8px',
        },
      },
    },
    section30: {
      headerTitle: 'SALES',
      content: content.getSection30Content(),
      // [
      // 	['Introducing 1 brand at $7k per month'],
      // 	['Maintaining stock items at 43 (max 50)'],
      // 	['Delete non-strategic brands under $2k p/m'],
      // 	['Stock turnover reduce from avg 37 to 30 days'],
      // ],
      styles: {
        container: {
          height: '143px',
        },
        header: {
          padding: '3px 0',
          background: 'rgba(74, 105, 189, 0.5)',
        },
        content: {
          padding: '3px 8px 13px 8px',
        },
      },
    },
    section31: {
      headerTitle: 'FULLFILLMENT',
      content: content.getSection31Content(),
      // [
      // 	['Introducing 1 brand at $7k per month'],
      // 	['Maintaining stock items at 43 (max 50)'],
      // 	['Delete non-strategic brands under $2k p/m'],
      // 	['Stock turnover reduce from avg 37 to 30 days'],
      // ],
      styles: {
        container: {
          height: '143px',
        },
        header: {
          padding: '3px 0',
          background: 'rgba(74, 105, 189, 0.5)',
        },
        content: {
          padding: '3px 8px 13px 8px',
        },
      },
    },
    section32: {
      headerTitle: 'SUPPORT',
      content: content.getSection32Content(),
      // [
      // 	['Introducing 1 brand at $7k per month'],
      // 	['Maintaining stock items at 43 (max 50)'],
      // 	['Delete non-strategic brands under $2k p/m'],
      // 	['Stock turnover reduce from avg 37 to 30 days'],
      // ],
      styles: {
        container: {
          height: '143px',
        },
        header: {
          padding: '3px 0',
          background: 'rgba(74, 105, 189, 0.5)',
        },
        content: {
          padding: '3px 8px 13px 8px',
        },
      },
    },
  };
}
