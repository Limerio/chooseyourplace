export const defaultOptionsDate = {
	year: "numeric",
	month: "short",
	day: "numeric",
	minute: "2-digit",
	hour: "2-digit",
}

export const langs = {
	en: "English",
	fr: "Français",
}

export const defaultOptions = {
	headers: {
		"Content-Type": "application/json",
	},
}

export const domainName =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: process.env.DOMAIN_NAME

export const loginRequiredPaths = ["/places/create"]
