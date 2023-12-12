import { TeamOutlined, AppstoreOutlined, PieChartOutlined } from '@ant-design/icons';

export const menuItems = [
	{
		label: 'dashboard',
		href: '/dashboard',
		icon: <AppstoreOutlined />
	},
	{
		label: 'dashboardPie',
		href: '/dashboard-2',
		icon: <PieChartOutlined />
	},
	{
		label: 'producers',
		href: '/producers',
		icon: <TeamOutlined />
	}
];
