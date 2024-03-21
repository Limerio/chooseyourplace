import { pick } from "@/utils/functions"
import { cleanup, render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { afterEach, describe, expect, it, vi } from "vitest"
import { MenuTheme } from "./MenuTheme"

vi.mock("next/router", () => vi.importActual("next-router-mock"))

describe("Menu theme component", () => {
	afterEach(() => {
		cleanup()
	})

	it("English render", async () => {
		const lang = "en"

		render(
			<NextIntlClientProvider
				locale={lang}
				messages={pick((await import(`@/languages/${lang}.json`)).default, [
					"MenuTheme",
				])}
			>
				<MenuTheme />
			</NextIntlClientProvider>,
		)

		const lightTheme = screen.queryByText(/light/u)
		expect(lightTheme).toBeDefined()
		const darkTheme = screen.queryByText(/dark/u)
		expect(darkTheme).toBeDefined()
	})

	it("French render", async () => {
		const lang = "fr"

		render(
			<NextIntlClientProvider
				locale={lang}
				messages={pick((await import(`@/languages/${lang}.json`)).default, [
					"MenuTheme",
				])}
			>
				<MenuTheme />
			</NextIntlClientProvider>,
		)

		const lightTheme = screen.queryByText(/clair/u)
		expect(lightTheme).toBeDefined()
		const darkTheme = screen.queryByText(/sombre/u)
		expect(darkTheme).toBeDefined()
	})
})
