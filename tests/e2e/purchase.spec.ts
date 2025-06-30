import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import ProductDetailPage from '../../pages/ProductDetailPage';
import CartPage from '../../pages/CartPage';

test('test', async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto('https://demoblaze.com/');
    await homePage.selectProduct('Samsung galaxy s6');

    const productDetailPage = new ProductDetailPage(page);
    await productDetailPage.addProductToCart();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    await productDetailPage.navigateToCart();

    const cartPage = new CartPage(page);
    await cartPage.verifyProductPresence('Samsung galaxy s6');
    await cartPage.purchase('user1234', 'Spain', 'Barcleona', '1234 5678 9012 3456', 'June', '2025');
    await cartPage.verifyPurchaseSuccess();
    await cartPage.verifyPopupClosure();
});