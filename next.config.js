/** @type {import("next").NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isProductionBranch = process.env.GITHUB_REF === 'refs/heads/production';

let assetPrefix = '';
let basePath = '';

// Only apply GitHub Pages settings when on production branch in GitHub Actions
if (isGithubActions && isProductionBranch) {
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
