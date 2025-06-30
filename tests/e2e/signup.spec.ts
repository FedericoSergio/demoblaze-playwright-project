import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';

test('Sign up', async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('https://demoblaze.com/');
    await homePage.signup('user.QA', 'dummyPassw0rd!');
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    await page.close();
});
