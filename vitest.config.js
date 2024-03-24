import react from "@vitejs/plugin-react"
import { URL } from "node:url"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [react()],
	test: {
		alias: {
			"@/": new URL("./src/", import.meta.url).pathname,
		},
		exclude: ["tests", "node_modules"],
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest-setup.js"],
	},
})
