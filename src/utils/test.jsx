import { pick } from "@/utils/functions"
import { cleanup, render } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { afterEach } from "vitest"

afterEach(() => {
	cleanup()
})

const customRender = async (ui, { lang, ...options } = { lang: "en" }) => {
	const messages = pick((await import(`@/languages/${lang}.json`)).default, [
		"Error",
	])

	return render(ui, {
		wrapper: ({ children }) => (
			<NextIntlClientProvider locale={lang} messages={messages}>
				{children}
			</NextIntlClientProvider>
		),
		...options,
	})
}

export * from "@testing-library/react"

export { customRender as render }
