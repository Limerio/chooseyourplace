import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		exclude: ["./tests"],
		globals: true,
		environment: "jsdom",
	},
})
