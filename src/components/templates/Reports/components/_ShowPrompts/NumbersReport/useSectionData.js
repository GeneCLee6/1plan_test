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

	console.log('numbers', numbers);

	const revenue90 =
		numbers?.page2?.q3[0] * numbers?.page2?.q4[0] * numbers?.page2?.q5[0];
	const revenue1 =
		numbers?.page2?.q3[1] * numbers?.page2?.q4[1] * numbers?.page2?.q5[1];
	const revenue3 =
		numbers?.page2?.q3[2] * numbers?.page2?.q4[2] * numbers?.page2?.q5[2];
	const revenue10 =
		numbers?.page2?.q3[3] * numbers?.page2?.q4[3] * numbers?.page2?.q5[3];
	const marketing90 = (revenue90 * numbers?.page3?.q6[0] * 0.01).toFixed(2);
	const marketing1 = (revenue1 * numbers?.page3?.q6[1] * 0.01).toFixed(2);
	const marketing3 = (revenue3 * numbers?.page3?.q6[2] * 0.01).toFixed(2);
	const marketing10 = (revenue10 * numbers?.page3?.q6[3] * 0.01).toFixed(2);
	const sales90 = (revenue90 * numbers?.page4?.q8[0] * 0.01).toFixed(2);
	const sales1 = (revenue1 * numbers?.page4?.q8[1] * 0.01).toFixed(2);
	const sales3 = (revenue3 * numbers?.page4?.q8[2] * 0.01).toFixed(2);
	const sales10 = (revenue10 * numbers?.page4?.q8[3] * 0.01).toFixed(2);
	const direct90 = (revenue90 * numbers?.page4?.q9[0] * 0.01).toFixed(2);
	const direct1 = (revenue1 * numbers?.page4?.q9[1] * 0.01).toFixed(2);
	const direct3 = (revenue3 * numbers?.page4?.q9[2] * 0.01).toFixed(2);
	const direct10 = (revenue10 * numbers?.page4?.q9[3] * 0.01).toFixed(2);
	const overhead90 = (revenue90 * numbers?.page5?.q10[0] * 0.01).toFixed(2);
	const overhead1 = (revenue1 * numbers?.page5?.q10[1] * 0.01).toFixed(2);
	const overhead3 = (revenue3 * numbers?.page5?.q10[2] * 0.01).toFixed(2);
	const overhead10 = (revenue10 * numbers?.page5?.q10[3] * 0.01).toFixed(2);
	const newCustomer90 = numbers?.page6?.q15;
	const inputLongYear = visionOfSuccess?.part1?.q1.answers[0].substring(
		0,
		visionOfSuccess?.part1?.q1.answers[0].indexOf(' ')
	);
	return {
		CARD1: {
			title: `Key  Financial Targets Year ${inputLongYear}`,
			info: [
				{
					label1: 'Year Ending',
					content1: moment
						.unix(numbers?.page1?.q1.seconds)
						.add(
							visionOfSuccess?.part1?.q1.answers[0].substring(
								0,
								visionOfSuccess?.part1?.q1.answers[0].indexOf(' ')
							),
							'y'
						)
						.format('DD/MM/YYYY'),
					label2: 'No. of owners',
					content2: numbers?.page6?.q13[3],
				},
				{
					label1: 'No. of Clients',
					content1: numbers?.page2?.q3[3],
					label2: 'Average Sale',
					content2: `$${numbers?.page2?.q4[3]}`,
				},
				{
					label1: 'No. of Transaction',
					content1: numbers?.page2?.q5[3],
					label2: 'Owners hours workdpw',
					content2: numbers?.page5?.q11[3],
				},
			],
			revenue: `$${revenue10}`, //TODO
			cost: [
				{
					label: 'Marketing',
					percentage: `${numbers?.page3?.q6[3]}%`,
					money: `$${marketing10}`,
				},
				{
					label: 'Cost of sales',
					percentage: `${numbers?.page4?.q8[3]}%`,
					money: `$${sales10}`,
				},
				{
					label: 'Direct Costs',
					percentage: `${numbers?.page4?.q9[3]}%`,
					money: `$${direct10}`,
				},
				{
					label: 'Overhead',
					percentage: `${numbers?.page5?.q10[3]}%`,
					money: `$${overhead10}`,
				},
			],
			ebit: `$${(
				revenue10 -
				marketing10 -
				sales10 -
				direct10 -
				overhead10
			).toFixed(2)}`,
			data: [
				{
					label1: 'Full-Time equivalen staff',
					content1: `${numbers?.page5?.q12[3]}`,
					label2: 'Revenue per staff member',
					content2: `$${(revenue10 / numbers?.page5?.q12[3]).toFixed(2)}`,
				},
				{
					label1: 'Client Retention Rate',
					content1: `${numbers?.page6?.q14[3]}%`,
					label2: 'Owners revenue per hour',
					content2: `$${(
						revenue10 /
						numbers?.page6?.q13[3] /
						numbers?.page5?.q11[3] /
						52
					).toFixed(2)}`,
				},
				{
					label1: 'New Customers',
					content1: newCustomer90,
					label2: 'Customer Acquisition Cost',
					content2: `$${(
						(marketing10 / newCustomer90) *
						4 *
						inputLongYear
					).toFixed(2)}`,
				},
			],
		},
		CARD2: {
			title: 'Key  Financial Targets Year 3',
			info: [
				{
					label1: 'Year Ending',
					content1: moment
						.unix(numbers?.page1?.q1.seconds)
						.add(3, 'y')
						.format('DD/MM/YYYY'),
					label2: 'No. of owners',
					content2: numbers?.page6?.q13[2],
				},
				{
					label1: 'No. of Clients',
					content1: numbers?.page2?.q3[2],
					label2: 'Average Sale',
					content2: `$${numbers?.page2?.q4[2]}`,
				},
				{
					label1: 'No. of Transaction',
					content1: numbers?.page2?.q5[2],
					label2: 'Owners hours workdpw',
					content2: numbers?.page5?.q11[2],
				},
			],
			revenue: `$${revenue3}`, //TODO
			cost: [
				{
					label: 'Marketing',
					percentage: `${numbers?.page3?.q6[2]}%`,
					money: `$${marketing3}`,
				},
				{
					label: 'Cost of sales',
					percentage: `${numbers?.page4?.q8[2]}%`,
					money: `$${sales3}`,
				},
				{
					label: 'Dierct Costs',
					percentage: `${numbers?.page4?.q9[2]}%`,
					money: `$${direct3}`,
				},
				{
					label: 'Overhead',
					percentage: `${numbers?.page5?.q10[2]}%`,
					money: `$${overhead3}`,
				},
			],
			ebit: `$${(revenue3 - marketing3 - sales3 - direct3 - overhead3).toFixed(
				2
			)}`,
			data: [
				{
					label1: 'Full-Time equivalen staff',
					content1: `${numbers?.page5?.q12[2]}`,
					label2: 'Revenue per staff member',
					content2: `$${(revenue3 / numbers?.page5?.q12[2]).toFixed(2)}`,
				},
				{
					label1: 'Client Retention Rate',
					content1: `${numbers?.page6?.q14[2]}%`,
					label2: 'Owners revenue per hour',
					content2: `$${(
						revenue3 /
						numbers?.page6?.q13[2] /
						numbers?.page5?.q11[2] /
						52
					).toFixed(2)}`,
				},
				{
					label1: 'New Customers',
					content1: newCustomer90,
					label2: 'Customer Acquisition Cost',
					content2: `$${((marketing3 / newCustomer90) * 4 * 3).toFixed(2)}`,
				},
			],
		},
		CARD3: {
			title: 'Key  Financial Targets Year 1',
			info: [
				{
					label1: 'Year Ending',
					content1: moment
						.unix(numbers?.page1?.q1.seconds)
						.add(1, 'y')
						.format('DD/MM/YYYY'),
					label2: 'No. of owners',
					content2: numbers?.page6?.q13[1],
				},
				{
					label1: 'No. of Clients',
					content1: numbers?.page2?.q3[1],
					label2: 'Average Sale',
					content2: `$${numbers?.page2?.q4[1]}`,
				},
				{
					label1: 'No. of Transaction',
					content1: numbers?.page2?.q5[1],
					label2: 'Owners hours workdpw',
					content2: numbers?.page5?.q11[1],
				},
			],
			revenue: `$${revenue1}`, //TODO
			cost: [
				{
					label: 'Marketing',
					percentage: `${numbers?.page3?.q6[1]}%`,
					money: `$${marketing1}`,
				},
				{
					label: 'Cost of sales',
					percentage: `${numbers?.page4?.q8[1]}%`,
					money: `$${sales1}`,
				},
				{
					label: 'Dierct Costs',
					percentage: `${numbers?.page4?.q9[1]}%`,
					money: `$${direct1}`,
				},
				{
					label: 'Overhead',
					percentage: `${numbers?.page5?.q10[1]}%`,
					money: `$${overhead1}`,
				},
			],
			ebit: `$${(revenue1 - marketing1 - sales1 - direct1 - overhead1).toFixed(
				2
			)}`,
			data: [
				{
					label1: 'Full-Time equivalen staff',
					content1: `${numbers?.page5?.q12[1]}`,
					label2: 'Revenue per staff member',
					content2: `$${(revenue1 / numbers?.page5?.q12[1]).toFixed(2)}`,
				},
				{
					label1: 'Client Retention Rate',
					content1: `${numbers?.page6?.q14[1]}%`,
					label2: 'Owners revenue per hour',
					content2: `$${(
						revenue1 /
						numbers?.page6?.q13[1] /
						numbers?.page5?.q11[1] /
						52
					).toFixed(2)}`,
				},
				{
					label1: 'New Customers',
					content1: newCustomer90,
					label2: 'Customer Acquisition Cost',
					content2: `$${((marketing1 / newCustomer90) * 4).toFixed(2)}`,
				},
			],
		},
		CARD4: {
			title: 'Key  Financial Targets Days 90',
			info: [
				{
					label1: 'Quarter Ending',
					content1: moment
						.unix(numbers?.page1?.q1.seconds)
						.format('DD/MM/YYYY'),
					label2: 'No. of owners',
					content2: numbers?.page6?.q13[0],
				},
				{
					label1: 'No. of Clients',
					content1: numbers?.page2?.q3[0],
					label2: 'Average Sale',
					content2: `$${numbers?.page2?.q4[0]}`,
				},
				{
					label1: 'No. of Transaction',
					content1: numbers?.page2?.q5[0],
					label2: 'Owners hours workdpw',
					content2: numbers?.page5?.q11[0],
				},
			],
			revenue: `$${revenue90}`,
			cost: [
				{
					label: 'Marketing',
					percentage: `${numbers?.page3?.q6[0]}%`,
					money: `$${marketing90}`,
				},
				{
					label: 'Cost of sales',
					percentage: `${numbers?.page4?.q8[0]}%`,
					money: `$${sales90}`,
				},
				{
					label: 'Dierct Costs',
					percentage: `${numbers?.page4?.q9[0]}%`,
					money: `$${direct90}`,
				},
				{
					label: 'Overhead',
					percentage: `${numbers?.page5?.q10[0]}%`,
					money: `$${overhead90}`,
				},
			],
			ebit: `$${(
				revenue90 -
				marketing90 -
				sales90 -
				direct90 -
				overhead90
			).toFixed(2)}`,
			data: [
				{
					label1: 'Full-Time equivalen staff',
					content1: `${numbers?.page5?.q12[0]}`,
					label2: 'Revenue per staff member',
					content2: `$${(revenue90 / numbers?.page5?.q12[0]).toFixed(2)}`,
				},
				{
					label1: 'Client Retention Rate',
					content1: `${numbers?.page6?.q14[0]}%`,
					label2: 'Owners revenue per hour',
					content2: `$${(
						revenue90 /
						numbers?.page6?.q13[0] /
						numbers?.page5?.q11[0] /
						12
					).toFixed(2)}`,
				},
				{
					label1: 'New Customers',
					content1: newCustomer90,
					label2: 'Customer Acquisition Cost',
					content2: `$${(marketing90 / newCustomer90).toFixed(2)}`,
				},
			],
		},
	};
}
