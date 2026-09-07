import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://anchorlineai.com",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  vite: { build: { sourcemap: false } },
});
