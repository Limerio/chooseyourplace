import { test } from "@playwright/test"

test.beforeEach(async ({ page }) => {
	await page.goto("/places/create")
})

test("Create a bar place", async ({ page }) => {
	await page.getByLabel("Building").click()
	await page.getByLabel("Bar").click()
	await page.getByPlaceholder("Name of the building....").click()
	await page.getByPlaceholder("Name of the building....").fill("Random bar")
	await page.getByPlaceholder("Which city are the building ?").click()
	await page
		.getByPlaceholder("Which city are the building ?")
		.fill("Random City")
	await page.getByPlaceholder("Which city are the building ?").press("Tab")
	await page.getByPlaceholder("What is the zipcode ?").fill("12345")
	await page.getByPlaceholder("What is the zipcode ?").press("Tab")
	await page.getByPlaceholder("Which country are the").fill("Random Country")
	await page.getByRole("button", { name: "Next" }).click()
	await page.getByLabel("Bar").click()
	await page.getByLabel("Cocktail").click()
	await page.getByLabel("Average Cost").click()
	await page.getByLabel("1").click()
	await page.getByRole("button", { name: "Next" }).click()
	await page.getByRole("button", { name: "Finish" }).click()
	await page.getByPlaceholder("Search by name...").click()
	await page.getByPlaceholder("Search by name...").fill("Random bar")
	await page.getByRole("cell", { name: "Random bar" }).click()
})

test("Create a museum place", async ({ page }) => {
	await page.getByLabel("Building").click()
	await page.getByLabel("Museum").click()
	await page.getByPlaceholder("Name of the building....").click()
	await page.getByPlaceholder("Name of the building....").fill("Random Museum")
	await page.getByPlaceholder("Name of the building....").press("Tab")
	await page
		.getByPlaceholder("Which city are the building ?")
		.fill("Random City")
	await page.getByPlaceholder("Which city are the building ?").press("Tab")
	await page.getByPlaceholder("What is the zipcode ?").fill("12345")
	await page.getByPlaceholder("What is the zipcode ?").press("Tab")
	await page.getByPlaceholder("Which country are the").fill("Random Country")
	await page.getByPlaceholder("Which country are the").press("Enter")
	await page.getByLabel("Museum").click()
	await page.getByLabel("Art", { exact: true }).click()
	await page.getByLabel("Artistic movements").click()
	await page.getByLabel("Renaissance").click()
	await page.getByLabel("Free or Pay ?").click()
	await page.getByLabel("Free", { exact: true }).click()
	await page.getByRole("button", { name: "Next" }).click()
	await page.getByPlaceholder("Give the price of the museum").fill("")
	await page.getByRole("button", { name: "Next" }).click()
	await page.getByRole("button", { name: "Finish" }).click()
	await page.getByPlaceholder("Search by name...").click()
	await page.getByPlaceholder("Search by name...").fill("Random Museum")
	await page.getByRole("cell", { name: "Random Museum" }).click()
})

test("Create a restaurant place", async ({ page }) => {
	await page.getByLabel("Building").click()
	await page.getByLabel("Restaurant").click()
	await page.getByPlaceholder("Name of the building....").click()
	await page
		.getByPlaceholder("Name of the building....")
		.fill("Random Restaurant")
	await page.getByPlaceholder("Name of the building....").press("Tab")
	await page
		.getByPlaceholder("Which city are the building ?")
		.fill("Random City")
	await page.getByPlaceholder("Which city are the building ?").press("Tab")
	await page.getByPlaceholder("What is the zipcode ?").fill("12345")
	await page.getByPlaceholder("What is the zipcode ?").press("Tab")
	await page.getByPlaceholder("Which country are the").fill("Random Country")
	await page.getByPlaceholder("Which country are the").press("Enter")
	await page.getByLabel("Restaurant").click()
	await page.getByLabel("Italian").click()
	await page.getByLabel("Stars").click()
	await page.getByLabel("1").click()
	await page.getByLabel("Average Cost").click()
	await page.getByLabel("1").click()
	await page.getByRole("button", { name: "Next" }).click()
	await page.getByRole("button", { name: "Finish" }).click()
	await page.getByPlaceholder("Search by name...").click()
	await page.getByPlaceholder("Search by name...").fill("Random Restaurant")
	await page.getByRole("cell", { name: "Random Restaurant" }).click()
})

test("Create a park place", async ({ page }) => {
	await page.locator("form").click()
	await page.getByLabel("Building").click()
	await page.getByLabel("Park").click()
	await page.getByPlaceholder("Name of the building....").click()
	await page.getByPlaceholder("Name of the building....").fill("Random Park")
	await page.getByPlaceholder("Name of the building....").press("Tab")
	await page
		.getByPlaceholder("Which city are the building ?")
		.fill("Random City")
	await page.getByPlaceholder("Which city are the building ?").press("Tab")
	await page.getByPlaceholder("What is the zipcode ?").fill("12345")
	await page.getByPlaceholder("What is the zipcode ?").press("Tab")
	await page.getByPlaceholder("Which country are the").fill("Random Country")
	await page.getByPlaceholder("Which country are the").press("Enter")
	await page.getByLabel("Park").click()
	await page.getByLabel("City").click()
	await page.getByLabel("Free or Pay ?").click()
	await page.getByLabel("Free", { exact: true }).click()
	await page.getByLabel("Public ?").click()
	await page.getByRole("button", { name: "Next" }).click()
	await page.getByPlaceholder("Give the price of the park").fill("")
	await page.getByRole("button", { name: "Next" }).click()
	await page.getByRole("button", { name: "Finish" }).click()
	await page.getByPlaceholder("Search by name...").click()
	await page.getByPlaceholder("Search by name...").fill("Random park")
	await page.getByRole("cell", { name: "Random Park" }).click()
})