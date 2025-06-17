/** @type {import("next").NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

let assetPrefix = '';
let basePath = '';

// This logic is only executed in production builds (github actions)
if (isGithubActions) {
	const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
	assetPrefix = `/${repo}/`;
	basePath = `/${repo}`;
}

module.exports = {
	reactStrictMode: true,
	images: {
		unoptimized: true,
	},
	swcMinify: true,
	output: 'export',
	trailingSlash: true,
	assetPrefix: assetPrefix,
	basePath: basePath,
};
