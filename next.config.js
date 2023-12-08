const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false
};

module.exports = withNextIntl(nextConfig);
