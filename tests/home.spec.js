import { test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" })
})

test("Create place with dialog", async ({ page }) => {
	await page.getByRole("button", { name: "Add" }).click()
	await page.getByLabel("Building").click()
	await page.getByLabel("Bar").click()
	await page.getByPlaceholder("Name of the building....").click()
	await page.getByPlaceholder("Name of the building....").fill("Random Name")
	await page.getByPlaceholder("Name of the building....").press("Tab")
	await page
		.getByPlaceholder("Which city are the building ?")
		.fill("Random City")
	await page.getByPlaceholder("Which city are the building ?").press("Tab")
	await page.getByPlaceholder("What is the zipcode ?").fill("12345")
	await page.getByPlaceholder("What is the zipcode ?").press("Tab")
	await page.getByPlaceholder("Which country are the").fill("Random Country")
	await page.getByRole("button", { name: "Next" }).click()
	await page.getByLabel("Bar").click()
	await page.getByLabel("Cocktail").getByText("Cocktail").click()

	await page.getByRole("button", { name: "Next" }).click()
	await page.getByLabel("Create a place").getByText("Bar").click()
	await page.getByRole("button", { name: "Finish" }).click()
})
