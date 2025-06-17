/** @type {import("next").NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isProductionBranch = process.env.GITHUB_REF === 'refs/heads/production';

let assetPrefix = '';
let basePath = '';

// Only apply GitHub Pages settings when on production branch in GitHub Actions
if (isGithubActions && isProductionBranch) {
	// Since we already have a /provisions route in the app, we'll use the root path
	// for GitHub Pages deployment to avoid double paths
	assetPrefix = '/';
	basePath = '';
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
