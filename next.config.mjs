/** @type {import('next').NextConfig} */

import nextPwa from "next-pwa"

const withPwa = nextPwa({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
})
const nextConfig = withPwa({
	output: "standalone",
	reactStrictMode: true,
	i18n: {
		locales: ["en", "fr"],
		defaultLocale: "en",
	},
})

export default nextConfig
