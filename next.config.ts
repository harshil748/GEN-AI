import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(
	__dirname,
	"src/visual-edits/component-tagger-loader.js"
);

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
	outputFileTracingRoot: path.resolve(__dirname, "../../"),
	turbopack: {
		rules: {
			"*.{jsx,tsx}": {
				loaders: [LOADER],
			},
		},
	},
};

const nextConfig = {
	experimental: {
		// allow LAN IPs during dev
		allowedDevOrigins: ["http://192.168.0.101:3000", "http://localhost:3000"],
	},
};

module.exports = nextConfig;
export default nextConfig;
