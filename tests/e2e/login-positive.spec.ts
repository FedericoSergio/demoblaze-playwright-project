import test, { expect } from '@playwright/test';
import HomePage from '../../pages/homePage';

//test.use({ storageState: './NoAuth.json' });
test('Login succesfull', async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('https://demoblaze.com');
    await homePage.login('user.QA', 'dummyPassw0rd!');
    await expect(page.getByRole('link', { name: 'Welcome user.QA' })).toBeVisible();
    await page.close();
});