import { expect, test } from '@playwright/test';
import HomePage from '../../pages/homePage';
import ProductDetailPage from '../../pages/ProductDetailPage';
import CartPage from '../../pages/CartPage';

test('test', async ({ page }) => {
    let homePage = new HomePage(page);

    
    await page.goto('https://demoblaze.com/');
    await homePage.selectProduct('Samsung galaxy s6');

    let productDetailPage = new ProductDetailPage(page);
    await productDetailPage.addProductToCart();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    productDetailPage.navigateToHome();
    
    homePage = new HomePage(page);
    await homePage.selectProduct('Nokia lumia 1520');
    productDetailPage = new ProductDetailPage(page);
    await productDetailPage.addProductToCart();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    await productDetailPage.navigateToCart();

    const cartPage = new CartPage(page);
    await cartPage.verifyProductPresence('Samsung galaxy s6');
    await cartPage.verifyProductPresence('Nokia lumia 1520');
    let productCount = await cartPage.getProductCount();
    expect(productCount).toBe(2);

    await cartPage.deleteProduct('Samsung galaxy s6');
    expect(cartPage.verifyProductPresence('Samsung galaxy s6')).toBeFalsy();
    productCount = await cartPage.getProductCount();
    expect(productCount).toBe(1);

});