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

	function handleEndDate(x) {
		if (Object.keys(quickStart).length > 2) {
			if (x) {
				return moment.unix(x).format('DD/MM/YYYY');
			} else {
				return '';
			}
		}
	}

	function handleUndefined(x) {
		if (Object.keys(quickStart).length > 2) {
			if (x) {
				return x;
			} else {
				return '';
			}
		}
	}
	function handleUndefinedMoment(x) {
		if (Object.keys(quickStart).length > 2) {
			if (x) {
				const date = moment.unix(x).format('DD/MM/YYYY');
				return date;
			} else {
				return '';
			}
		}
	}

	function handleUndefinedDollar(x) {
		if (Object.keys(quickStart).length > 2) {
			if (x) {
				return `$${x.toLocaleString()}`;
			} else {
				return '';
			}
		}
	}

	return {
		CARD1: {
			title: 'QUARTERLY PRIORITIES',
			subtitle:
				'What do we want completed by quarter end Prioritized by 80/20 rule',
			list: [
				quickStart?.part1?.q1?.answers[0],
				quickStart?.part1?.q1?.answers[1],
				quickStart?.part1?.q1?.answers[2],
				quickStart?.part1?.q1?.answers[3],
				quickStart?.part1?.q1?.answers[4],
			],
		},
		CARD2: {
			title: 'QUARTERLY THEME',
			list: [
				{
					label: 'Quarter end date',
					content: handleEndDate(quickStart?.part3?.q8.seconds),
				},
				{
					label: 'Standout Measure of Success',
					content: quickStart?.part3?.q9,
				},
				{
					label: 'Theme name',
					content: quickStart?.part3?.q10,
				},
			],
			image: quickStart?.part3?.q11,
		},
		CARD3: {
			title: 'QUARTERLY ACCOUNTABILITY - "CEO"',
			headers: [
				{
					label: "Quarterly Action's - You",
				},
				{
					label: 'Who/When',
				},
			],
			rows: {
				a1: [
					handleUndefined(quickStart?.part2?.q3?.answers?.a1[0]),
					handleUndefined(quickStart?.part2?.q3?.answers?.a1[1]),
					handleUndefinedMoment(quickStart?.part2?.q3?.answers?.a1[2].seconds),
				],
				a2: [
					handleUndefined(quickStart?.part2?.q3?.answers?.a2[0]),
					handleUndefined(quickStart?.part2?.q3?.answers?.a2[1]),
					handleUndefinedMoment(quickStart?.part2?.q3?.answers?.a2[2].seconds),
				],
				a3: [
					handleUndefined(quickStart?.part2?.q3?.answers?.a3[0]),
					handleUndefined(quickStart?.part2?.q3?.answers?.a3[1]),
					handleUndefinedMoment(quickStart?.part2?.q3?.answers?.a3[2].seconds),
				],
				a4: [
					handleUndefined(quickStart?.part2?.q3?.answers?.a4[0]),
					handleUndefined(quickStart?.part2?.q3?.answers?.a4[1]),
					handleUndefinedMoment(quickStart?.part2?.q3?.answers?.a4[2].seconds),
				],
			},
		},
		CARD4: {
			title: 'QUARTERLY ACCOUNTABILITY - "Others"',
			headers: [
				{
					label: "Quarterly Action's - You",
				},
				{
					label: 'Who/When',
				},
			],
			rows: {
				a1: [
					handleUndefined(quickStart?.part2?.q4?.answers?.a1[0]),
					handleUndefined(quickStart?.part2?.q4?.answers?.a1[1]),
					handleUndefinedMoment(quickStart?.part2?.q4?.answers?.a1[2].seconds),
				],
				a2: [
					handleUndefined(quickStart?.part2?.q4?.answers?.a2[0]),
					handleUndefined(quickStart?.part2?.q4?.answers?.a2[1]),
					handleUndefinedMoment(quickStart?.part2?.q4?.answers?.a2[2].seconds),
				],
				a3: [
					handleUndefined(quickStart?.part2?.q4?.answers?.a3[0]),
					handleUndefined(quickStart?.part2?.q4?.answers?.a3[1]),
					handleUndefinedMoment(quickStart?.part2?.q4?.answers?.a3[2].seconds),
				],
				a4: [
					handleUndefined(quickStart?.part2?.q4?.answers?.a4[0]),
					handleUndefined(quickStart?.part2?.q4?.answers?.a4[1]),
					handleUndefinedMoment(quickStart?.part2?.q4?.answers?.a4[2].seconds),
				],
			},
		},
		CARD5: {
			title: 'PEOPLE I NEED',
			headers: [
				{
					label:
						'Outsourcing, Contractors, Freelancers, Professionals, Staff, etc',
					width: '130px',
				},
				{
					label: 'Cost',
					width: '80px',
				},
				{
					label: 'Timing',
					width: '50px',
				},
			],
			rows: {
				a1: [
					handleUndefined(quickStart?.part2?.q5?.answers?.a1[0]),
					handleUndefinedDollar(quickStart?.part2?.q5?.answers?.a1[1]),
					handleUndefinedMoment(quickStart?.part2?.q5?.answers?.a1[2].seconds),
				],
				a2: [
					handleUndefined(quickStart?.part2?.q5?.answers?.a2[0]),
					handleUndefinedDollar(quickStart?.part2?.q5?.answers?.a2[1]),
					handleUndefinedMoment(quickStart?.part2?.q5?.answers?.a2[2].seconds),
				],
				a3: [
					handleUndefined(quickStart?.part2?.q5?.answers?.a3[0]),
					handleUndefinedDollar(quickStart?.part2?.q5?.answers?.a3[1]),
					handleUndefinedMoment(quickStart?.part2?.q5?.answers?.a3[2].seconds),
				],
				a4: [
					handleUndefined(quickStart?.part2?.q5?.answers?.a4[0]),
					handleUndefinedDollar(quickStart?.part2?.q5?.answers?.a4[1]),
					handleUndefinedMoment(quickStart?.part2?.q5?.answers?.a4[2].seconds),
				],
			},
		},
		CARD6: {
			title: 'RESOURCES I NEED',
			headers: [
				{
					label: 'Plant, Equipment, Tools, Vehicles, etc',
					width: '130px',
				},
				{
					label: 'Cost',
					width: '80px',
				},
				{
					label: 'Timing',
					width: '50px',
				},
			],
			rows: {
				a1: [
					handleUndefined(quickStart?.part2?.q6?.answers?.a1[0]),
					handleUndefinedDollar(quickStart?.part2?.q6?.answers?.a1[1]),
					handleUndefinedMoment(quickStart?.part2?.q6?.answers?.a1[2].seconds),
				],
				a2: [
					handleUndefined(quickStart?.part2?.q6?.answers?.a2[0]),
					handleUndefinedDollar(quickStart?.part2?.q6?.answers?.a2[1]),
					handleUndefinedMoment(quickStart?.part2?.q6?.answers?.a2[2].seconds),
				],
				a3: [
					handleUndefined(quickStart?.part2?.q6?.answers?.a3[0]),
					handleUndefinedDollar(quickStart?.part2?.q6?.answers?.a3[1]),
					handleUndefinedMoment(quickStart?.part2?.q6?.answers?.a3[2].seconds),
				],
				a4: [
					handleUndefined(quickStart?.part2?.q6?.answers?.a4[0]),
					handleUndefinedDollar(quickStart?.part2?.q6?.answers?.a4[1]),
					handleUndefinedMoment(quickStart?.part2?.q6?.answers?.a4[2].seconds),
				],
			},
		},
		CARD7: {
			title: 'PROCESS I NEED',
			headers: [
				{
					label: 'Apps, Subscriptions, Procedures, etc',
					width: '130px',
				},
				{
					label: 'Cost',
					width: '80px',
				},
				{
					label: 'Timing',
					width: '50px',
				},
			],
			rows: {
				a1: [
					handleUndefined(quickStart?.part2?.q7?.answers?.a1[0]),
					handleUndefinedDollar(quickStart?.part2?.q7?.answers?.a1[1]),
					handleUndefinedMoment(quickStart?.part2?.q7?.answers?.a1[2].seconds),
				],
				a2: [
					handleUndefined(quickStart?.part2?.q7?.answers?.a2[0]),
					handleUndefinedDollar(quickStart?.part2?.q7?.answers?.a2[1]),
					handleUndefinedMoment(quickStart?.part2?.q7?.answers?.a2[2].seconds),
				],
				a3: [
					handleUndefined(quickStart?.part2?.q7?.answers?.a3[0]),
					handleUndefinedDollar(quickStart?.part2?.q7?.answers?.a3[1]),
					handleUndefinedMoment(quickStart?.part2?.q7?.answers?.a3[2].seconds),
				],
				a4: [
					handleUndefined(quickStart?.part2?.q7?.answers?.a4[0]),
					handleUndefinedDollar(quickStart?.part2?.q7?.answers?.a4[1]),
					handleUndefinedMoment(quickStart?.part2?.q7?.answers?.a4[2].seconds),
				],
			},
		},
		CARD8: {
			title: 'Departments',
			headers: [
				{
					label: 'Departments',
					width: '130px',
				},
				{
					label: 'Rank %',
					width: '80px',
				},
				{
					label: 'Improvement Ideas',
					width: '50px',
				},
			],
			rows: {
				a1: [
					handleUndefined(quickStart?.part2?.q2?.answers?.a1[0]),
					handleUndefined(quickStart?.part2?.q2?.answers?.a1[1]),
					handleUndefined(quickStart?.part2?.q2?.answers?.a1[2]),
				],
				a2: [
					handleUndefined(quickStart?.part2?.q2?.answers?.a2[0]),
					handleUndefined(quickStart?.part2?.q2?.answers?.a2[1]),
					handleUndefined(quickStart?.part2?.q2?.answers?.a2[2]),
				],
				a3: [
					handleUndefined(quickStart?.part2?.q2?.answers?.a3[0]),
					handleUndefined(quickStart?.part2?.q2?.answers?.a3[1]),
					handleUndefined(quickStart?.part2?.q2?.answers?.a3[2]),
				],
				a4: [
					handleUndefined(quickStart?.part2?.q2?.answers?.a4[0]),
					handleUndefined(quickStart?.part2?.q2?.answers?.a4[1]),
					handleUndefined(quickStart?.part2?.q2?.answers?.a4[2]),
				],
			},
		},
	};
}
