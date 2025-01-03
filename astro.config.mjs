import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	site: "https://example.com",
	integrations: [mdx(), sitemap(), tailwind(), react()],
	adapter: cloudflare(),
});
