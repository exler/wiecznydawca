import { test, expect } from '@playwright/test';

test('Should navigate to the home page', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check the page title to make sure Head is set properly
  await expect(page).toHaveTitle(/Wieczny Dawca/);

  // Check the main title to make sure the page content is visible
  const title = page.getByRole("heading", { name: "Zorganizuj swoje krwiodawstwo" });
  await expect(title).toHaveText('Zorganizuj swoje krwiodawstwo');

  // Find a link to the login page to make sure navigation is visible
  const loginHref = page.getByRole("link", { name: "Zaloguj się" });
  await expect(loginHref).toHaveText('Zaloguj się');

  // Check if the footer component is visible
  const footer = page.locator('footer').first();
  await expect(footer).toContainText('Copyright');
});
