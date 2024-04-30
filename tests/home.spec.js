import { expect, test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" })
})

test("Theme", async ({ page }) => {
	await page.getByRole("button", { name: "Toggle theme" }).click()
	await page.getByRole("menuitem", { name: "Light" }).click()
	await expect(page.locator("html")).toHaveClass("light")

	await page.getByRole("button", { name: "Toggle theme" }).click()
	await page.getByRole("menuitem", { name: "Dark" }).click()
	await expect(page.locator("html")).toHaveClass("dark")

	await page.getByRole("button", { name: "Toggle theme" }).click()
	await page.getByRole("menuitem", { name: "System" }).click()
})

test("Pagination", async ({ page }) => {
	await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled()
	await page.getByRole("button", { name: "Next" }).click()

	await expect(page.getByRole("button", { name: "Previous" })).toBeEnabled()
	await page.getByRole("button", { name: "Previous" }).click()
	await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled()
})
