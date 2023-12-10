const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	webpack: (config) => {
		config.resolve.alias.canvas = false;
		return config;
	},
	transpilePackages: [
		'antd',
		'@ant-design',
		'rc-util',
		'rc-pagination',
		'rc-picker',
		'rc-notification',
		'rc-tooltip',
		'rc-tree',
		'rc-table'
	],
	env: {
		SERVER_URL: process.env.SERVER_URL
	}
};

module.exports = withNextIntl(nextConfig);
