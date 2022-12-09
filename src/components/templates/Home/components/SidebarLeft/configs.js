import { MdPerson, MdHouse, MdOutlineDashboard } from 'react-icons/md';
import { FaBook, FaEye, FaEnvelope } from 'react-icons/fa';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { AiOutlineCheck, AiOutlineOrderedList } from 'react-icons/ai';
import { GiTrophyCup } from 'react-icons/gi';

export const navigationTabs = [
	{
		label: 'Dashboard',
		icon: MdOutlineDashboard,
		route: ['/home/dashboard'],
	},
	{
		label: 'User Profile',
		icon: MdPerson,
		route: ['/home/profile'],
	},
	{
		label: 'Business Information',
		icon: MdHouse,
		route: ['/home/company-info', '/home/company-info/create'],
	},
	{
		label: 'Reports',
		icon: FaBook,
		route: ['/reports'],
	},
	{
		label: 'Invite User',
		icon: FaEnvelope,
		route: ['/home/invite-user'],
	},
];

export const actionPlanButtons = [
	{
		label: 'Start New Plan',
	},
	{
		label: 'Go To Plan',
	},
];

export const goToSectionTabs = [
	{
		label: 'Quick Start',
		icon: BsFillPlayCircleFill,
		route: '/reports?report-index=0',
	},
	{
		label: 'Rewards & Celebrations',
		icon: GiTrophyCup,
		route: '/reports?report-index=1',
	},
	{
		label: 'Strengths & Opportunities',
		icon: AiOutlineCheck,
		route: '/reports?report-index=2',
	},
	{
		label: 'Vision of Success',
		icon: FaEye,
		route: '/reports?report-index=3',
	},
	{
		label: 'Numbers',
		icon: AiOutlineOrderedList,
		route: '/reports?report-index=4',
	},
];
