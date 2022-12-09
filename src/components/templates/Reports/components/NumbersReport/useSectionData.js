import { useContext } from 'react';
import { SectionsContext } from 'contexts/SectionsProvider';
import moment from 'moment';

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

  function handleUndefined(x) {
    if (Object.keys(numbers).length > 2) {
      if (x) {
        return x;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  function handleDolloarUndefined(x) {
    if (x) {
      return `$${x}`;
    } else {
      return '';
    }
  }

  function handleDolloarUndefinedFix210(x) {
    if (x) {
      //return `$${x}`;
      return `$${+(
        revenue10 /
        numbers?.page6?.q13[3] /
        numbers?.page5?.q11[3] /
        52
      ).toFixed(2)}`;
    } else {
      return '';
    }
  }

  function handleCACUndefinedFix210(x) {
    if (x) {
      //return `$${x}`;
      return `$${(
        (marketing10 / newCustomer90) *
        4 *
        inputLongYear
      ).toLocaleString()}`;
    } else {
      return '';
    }
  }

  function handleCACUndefinedFix23(x) {
    if (x) {
      //return `$${x}`;
      return `$${((marketing10 / newCustomer90) * 4 * 3).toLocaleString()}`;
    } else {
      return '';
    }
  }

  function handleCACUndefinedFix21(x) {
    if (x) {
      //return `$${x}`;
      return `$${((marketing10 / newCustomer90) * 4).toLocaleString()}`;
    } else {
      return '';
    }
  }
  function handleCACUndefinedFix290(x) {
    if (x) {
      //return `$${x}`;
      return `$${(marketing90 / newCustomer90).toFixed(2)}`;
    } else {
      return '';
    }
  }

  function handleDolloarUndefinedFix23(x) {
    if (x) {
      return `$${(
        revenue3 /
        numbers?.page6?.q13[2] /
        numbers?.page5?.q11[2] /
        52
      ).toFixed(2)}`;
    } else {
      return '';
    }
  }

  function handleDolloarUndefinedFix21(x) {
    if (x) {
      return `$${(
        revenue1 /
        numbers?.page6?.q13[1] /
        numbers?.page5?.q11[1] /
        52
      ).toFixed(2)}`;
    } else {
      return '';
    }
  }

  function handleDolloarUndefinedFix290(x) {
    if (x) {
      return `$${(
        revenue90 /
        numbers?.page6?.q13[0] /
        numbers?.page5?.q11[0] /
        12
      ).toFixed(2)}`;
    } else {
      return '';
    }
  }

  function handleUndefinedRevenue(x) {
    if (x) {
      return `$${x.toLocaleString()}`;
    } else {
      return '';
    }
  }

  function handleUndefinedPercentage(x) {
    if (x) {
      return `${numbers?.page3?.q6[2]}%`;
    } else {
      return '';
    }
  }

  function handleUndefinedYear10(x) {
    if (x && visionOfSuccess?.part1?.q1.answers[0]) {
      const newYear = moment
        .unix(numbers?.page1?.q1.seconds)
        .add(
          visionOfSuccess?.part1?.q1.answers[0].substring(
            0,
            visionOfSuccess?.part1?.q1.answers[0].indexOf(' ')
          ),
          'y'
        )
        .format('DD/MM/YYYY');
      return newYear;
    } else {
      return '';
    }
  }

  function handleUndefinedYear3(x) {
    if (x) {
      const newYear = moment
        .unix(numbers?.page1?.q1.seconds)
        .add(3, 'y')
        .format('DD/MM/YYYY');
      return newYear;
    } else {
      return '';
    }
  }

  function handleUndefinedYear1(x) {
    if (x) {
      const newYear = moment
        .unix(numbers?.page1?.q1.seconds)
        .add(1, 'y')
        .format('DD/MM/YYYY');
      return newYear;
    } else {
      return '';
    }
  }

  function handleUndefined90(x) {
    if (x) {
      const newYear = moment
        .unix(numbers?.page1?.q1.seconds)
        .format('DD/MM/YYYY');
      return newYear;
    } else {
      return '';
    }
  }

  function handleInputUndefinedLongyear(x) {
    if (x) {
      const longYear = visionOfSuccess?.part1?.q1.answers[0].substring(
        0,
        visionOfSuccess?.part1?.q1.answers[0].indexOf(' ')
      );
      return longYear;
    } else {
      return '';
    }
  }

  const x = handleUndefined(`${numbers?.page2?.q4[3]}`);

  const revenue90 =
    numbers?.page2?.q3[0] * numbers?.page2?.q4[0] * numbers?.page2?.q5[0];
  const revenue1 =
    numbers?.page2?.q3[1] * numbers?.page2?.q4[1] * numbers?.page2?.q5[1];
  const revenue3 =
    numbers?.page2?.q3[2] * numbers?.page2?.q4[2] * numbers?.page2?.q5[2];
  const revenue10 =
    numbers?.page2?.q3[3] * numbers?.page2?.q4[3] * numbers?.page2?.q5[3];
  const marketing90 = revenue90 * numbers?.page3?.q6[0] * 0.01;
  const marketing1 = revenue1 * numbers?.page3?.q6[1] * 0.01;
  const marketing3 = revenue3 * numbers?.page3?.q6[2] * 0.01;
  const marketing10 = revenue10 * numbers?.page3?.q6[3] * 0.01;
  const sales90 = revenue90 * numbers?.page4?.q8[0] * 0.01;
  const sales1 = revenue1 * numbers?.page4?.q8[1] * 0.01;
  const sales3 = revenue3 * numbers?.page4?.q8[2] * 0.01;
  const sales10 = revenue10 * numbers?.page4?.q8[3] * 0.01;
  const direct90 = revenue90 * numbers?.page4?.q9[0] * 0.01;
  const direct1 = revenue1 * numbers?.page4?.q9[1] * 0.01;
  const direct3 = revenue3 * numbers?.page4?.q9[2] * 0.01;
  const direct10 = revenue10 * numbers?.page4?.q9[3] * 0.01;
  const overhead90 = revenue90 * numbers?.page5?.q10[0] * 0.01;
  const overhead1 = revenue1 * numbers?.page5?.q10[1] * 0.01;
  const overhead3 = revenue3 * numbers?.page5?.q10[2] * 0.01;
  const overhead10 = revenue10 * numbers?.page5?.q10[3] * 0.01;
  const newCustomer90 = numbers?.page6?.q15;

  const inputLongYear = handleInputUndefinedLongyear(
    visionOfSuccess?.part1?.q1.answers[0]
  );
  return {
    CARD1: {
      title: `Key  Financial Targets Year ${inputLongYear}`,
      info: [
        {
          label1: 'Year Ending',
          content1: handleUndefinedYear10(numbers?.page1?.q1.seconds),
          label2: 'No. of owners',
          content2: numbers?.page6?.q13[3],
        },
        {
          label1: 'No. of Clients',
          content1: numbers?.page2?.q3[3],
          label2: 'Average Sale',
          content2: handleDolloarUndefined(numbers?.page2?.q4[3]),
        },
        {
          label1: 'No. of Transaction',
          content1: numbers?.page2?.q5[3],
          label2: 'Owners hours workdpw',
          content2: numbers?.page5?.q11[3],
        },
      ],
      revenue: handleUndefinedRevenue(revenue10),
      cost: [
        {
          label: 'Marketing',
          percentage: handleUndefinedPercentage(numbers?.page3?.q6[3]),
          money: handleUndefinedRevenue(marketing10),
        },
        {
          label: 'Cost of sales',
          percentage: handleUndefinedPercentage(numbers?.page4?.q8[3]),
          money: handleUndefinedRevenue(sales10),
        },
        {
          label: 'Direct Costs',
          percentage: handleUndefinedPercentage(numbers?.page4?.q9[3]),
          money: handleUndefinedRevenue(direct10),
        },
        {
          label: 'Overhead',
          percentage: handleUndefinedPercentage(numbers?.page5?.q10[3]),
          money: handleUndefinedRevenue(overhead10),
        },
      ],
      ebit: handleUndefinedRevenue(
        revenue10 - marketing10 - sales10 - direct10 - overhead10
      ),
      data: [
        {
          label1: 'Full-Time equivalen staff',
          content1: handleUndefined(numbers?.page5?.q12[3]),
          label2: 'Revenue per staff member',
          content2: handleUndefinedRevenue(revenue10 / numbers?.page5?.q12[3]),
        },
        {
          label1: 'Client Retention Rate',
          content1: handleUndefinedPercentage(numbers?.page6?.q14[3]),
          label2: 'Owners revenue per hour',
          content2: handleDolloarUndefinedFix210(
            revenue10 / numbers?.page6?.q13[3] / numbers?.page5?.q11[3] / 52
          ),
        },
        {
          label1: 'New Customers',
          content1: newCustomer90,
          label2: 'Customer Acquisition Cost',
          content2: handleCACUndefinedFix210(
            (marketing10 / newCustomer90) * 4 * inputLongYear
          ),
        },
      ],
    },
    CARD2: {
      title: 'Key  Financial Targets Year 3',
      info: [
        {
          label1: 'Year Ending',
          content1: handleUndefinedYear3(numbers?.page1?.q1.seconds),
          label2: 'No. of owners',
          content2: numbers?.page6?.q13[2],
        },
        {
          label1: 'No. of Clients',
          content1: numbers?.page2?.q3[2],
          label2: 'Average Sale',
          content2: handleDolloarUndefined(numbers?.page2?.q4[2]),
        },
        {
          label1: 'No. of Transaction',
          content1: numbers?.page2?.q5[2],
          label2: 'Owners hours workdpw',
          content2: numbers?.page5?.q11[2],
        },
      ],
      revenue: handleUndefinedRevenue(revenue3),
      cost: [
        {
          label: 'Marketing',
          percentage: handleUndefinedPercentage(numbers?.page3?.q6[2]),
          money: handleUndefinedRevenue(marketing3),
        },
        {
          label: 'Cost of sales',
          percentage: handleUndefinedPercentage(numbers?.page4?.q8[2]),
          money: handleUndefinedRevenue(sales3),
        },
        {
          label: 'Dierct Costs',
          percentage: handleUndefinedPercentage(numbers?.page4?.q9[2]),
          money: handleUndefinedRevenue(direct3),
        },
        {
          label: 'Overhead',
          percentage: handleUndefinedPercentage(numbers?.page5?.q10[2]),
          money: handleUndefinedRevenue(overhead3),
        },
      ],
      ebit: handleUndefinedRevenue(
        revenue3 - marketing3 - sales3 - direct3 - overhead3
      ),
      data: [
        {
          label1: 'Full-Time equivalen staff',
          content1: handleUndefined(numbers?.page5?.q12[2]),
          label2: 'Revenue per staff member',
          content2: handleUndefinedRevenue(revenue3 / numbers?.page5?.q12[2]),
        },
        {
          label1: 'Client Retention Rate',
          content1: handleUndefinedPercentage(numbers?.page6?.q14[2]),
          label2: 'Owners revenue per hour',
          content2: handleDolloarUndefinedFix23(
            revenue3 / numbers?.page6?.q13[2] / numbers?.page5?.q11[2] / 52
          ),
        },
        {
          label1: 'New Customers',
          content1: newCustomer90,
          label2: 'Customer Acquisition Cost',
          content2: handleCACUndefinedFix23(
            (marketing3 / newCustomer90) * 4 * 3
          ),
        },
      ],
    },
    CARD3: {
      title: 'Key  Financial Targets Year 1',
      info: [
        {
          label1: 'Year Ending',
          content1: handleUndefinedYear1(numbers?.page1?.q1.seconds),
          label2: 'No. of owners',
          content2: numbers?.page6?.q13[1],
        },
        {
          label1: 'No. of Clients',
          content1: numbers?.page2?.q3[1],
          label2: 'Average Sale',
          content2: handleDolloarUndefined(numbers?.page2?.q4[1]),
        },
        {
          label1: 'No. of Transaction',
          content1: numbers?.page2?.q5[1],
          label2: 'Owners hours workdpw',
          content2: numbers?.page5?.q11[1],
        },
      ],
      revenue: handleUndefinedRevenue(revenue1),
      cost: [
        {
          label: 'Marketing',
          percentage: handleUndefinedPercentage(numbers?.page3?.q6[1]),
          money: handleUndefinedRevenue(marketing1),
        },
        {
          label: 'Cost of sales',
          percentage: handleUndefinedPercentage(numbers?.page4?.q8[1]),
          money: handleUndefinedRevenue(sales1),
        },
        {
          label: 'Dierct Costs',
          percentage: handleUndefinedPercentage(numbers?.page4?.q9[1]),
          money: handleUndefinedRevenue(direct1),
        },
        {
          label: 'Overhead',
          percentage: handleUndefinedPercentage(numbers?.page5?.q10[1]),
          money: handleUndefinedRevenue(overhead1),
        },
      ],
      ebit: handleUndefinedRevenue(
        revenue1 - marketing1 - sales1 - direct1 - overhead1
      ),
      data: [
        {
          label1: 'Full-Time equivalen staff',
          content1: handleUndefined(numbers?.page5?.q12[1]),
          label2: 'Revenue per staff member',
          content2: handleUndefinedRevenue(revenue1 / numbers?.page5?.q12[1]),
        },
        {
          label1: 'Client Retention Rate',
          content1: handleUndefinedPercentage(numbers?.page6?.q14[1]),
          label2: 'Owners revenue per hour',
          content2: handleDolloarUndefinedFix21(
            revenue1 / numbers?.page6?.q13[1] / numbers?.page5?.q11[1] / 52
          ),
        },
        {
          label1: 'New Customers',
          content1: newCustomer90,
          label2: 'Customer Acquisition Cost',
          content2: handleCACUndefinedFix21((marketing1 / newCustomer90) * 4),
        },
      ],
    },
    CARD4: {
      title: 'Key  Financial Targets Days 90',
      info: [
        {
          label1: 'Quarter Ending',
          content1: handleUndefined90(numbers?.page1?.q1.seconds),
          label2: 'No. of owners',
          content2: numbers?.page6?.q13[0],
        },
        {
          label1: 'No. of Clients',
          content1: numbers?.page2?.q3[0],
          label2: 'Average Sale',
          content2: handleDolloarUndefined(numbers?.page2?.q4[0]),
        },
        {
          label1: 'No. of Transaction',
          content1: numbers?.page2?.q5[0],
          label2: 'Owners hours workdpw',
          content2: numbers?.page5?.q11[0],
        },
      ],
      revenue: handleUndefinedRevenue(revenue90),
      cost: [
        {
          label: 'Marketing',
          percentage: handleUndefinedPercentage(numbers?.page3?.q6[0]),
          money: handleUndefinedRevenue(marketing90),
        },
        {
          label: 'Cost of sales',
          percentage: handleUndefinedPercentage(numbers?.page4?.q8[0]),
          money: handleUndefinedRevenue(sales90),
        },
        {
          label: 'Dierct Costs',
          percentage: handleUndefinedPercentage(numbers?.page4?.q9[0]),
          money: handleUndefinedRevenue(direct90),
        },
        {
          label: 'Overhead',
          percentage: handleUndefinedPercentage(numbers?.page5?.q10[0]),
          money: handleUndefinedRevenue(overhead90),
        },
      ],
      ebit: handleUndefinedRevenue(
        revenue90 - marketing90 - sales90 - direct90 - overhead90
      ),
      data: [
        {
          label1: 'Full-Time equivalen staff',
          content1: handleUndefined(numbers?.page5?.q12[0]),
          label2: 'Revenue per staff member',
          content2: handleUndefinedRevenue(revenue90 / numbers?.page5?.q12[0]),
        },
        {
          label1: 'Client Retention Rate',
          content1: handleUndefinedPercentage(numbers?.page6?.q14[0]),
          label2: 'Owners revenue per hour',
          content2: handleDolloarUndefinedFix290(
            revenue90 / numbers?.page6?.q13[0] / numbers?.page5?.q11[0] / 12
          ),
        },
        {
          label1: 'New Customers',
          content1: newCustomer90,
          label2: 'Customer Acquisition Cost',
          content2: handleCACUndefinedFix290(marketing90 / newCustomer90),
        },
      ],
    },
  };
}
