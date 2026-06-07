import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  output: "export",
  basePath: isGitHubPages ? "/sunoprompt-studio" : "",
  assetPrefix: isGitHubPages ? "/sunoprompt-studio/" : ""
};

export default nextConfig;
