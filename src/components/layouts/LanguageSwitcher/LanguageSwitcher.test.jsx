import { pick } from "@/utils/functions"
import { cleanup, render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { LanguageSwitcher } from "./LanguageSwitcher"

describe("LanguageSwitcher component", () => {
	vi.mock("next/router", () => vi.importActual("next-router-mock"))

	afterEach(() => {
		cleanup()
	})

	let lang = "en"

	beforeEach(async () => {
		render(
			<NextIntlClientProvider
				locale={lang}
				messages={pick((await import(`@/languages/${lang}.json`)).default, [
					"Utils",
				])}
			>
				<LanguageSwitcher />
			</NextIntlClientProvider>,
		)
	})

	it("LanguageSwitcher english version", () => {
		lang = "en"

		const langFrench = screen.queryByText(/Français/u)
		expect(langFrench).toBeDefined()
	})

	it("LanguageSwitcher french version", () => {
		lang = "fr"

		const langFrench = screen.queryByText(/Français/u)
		expect(langFrench).toBeDefined()
	})
})
