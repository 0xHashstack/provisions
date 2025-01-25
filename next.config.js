/** @type {import("next").NextConfig} */

module.exports = {
	reactStrictMode: true,
	images: {
		unoptimized: true,
	},
	experimental: {
		appDir: true,
	},
	swcMinify: true,
	output: 'export',
	trailingSlash: true,
};
