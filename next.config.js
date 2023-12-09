const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		SERVER_URL: process.env.SERVER_URL
	}
};

module.exports = withNextIntl(nextConfig);
