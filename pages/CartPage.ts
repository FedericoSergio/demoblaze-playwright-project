import { expect, Page } from '@playwright/test';
import BasePage from './BasePage';
import { time } from 'console';

export default class CartPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly cartSelectors = {
        placeOrderBtn: 'button:has-text("Place Order")',
        totalPrice: '#totalp',
        productList: '#tbodyid',
        deleteBtn: 'a:has-text("Delete")',
        product: '.success',
    }

    private readonly productSelectors = {
        pic: 'xpath = /td[0]/img',
        title: 'xpath = /td[1]',
        price: 'xpath = /td[2]',
        delete: 'xpath = /td[3]/a',
    }

    private readonly orderFormSelectors = {
        name: '#name',
        country: '#country',
        city: '#city',
        card: '#card',
        month: '#month',
        year: '#year',
        purchaseBtn: 'button:has-text("Purchase")',
        closeBtn: 'button:has-text("Close")',
    }

    private readonly successPopupSelectors = {
        message: 'h2:has-text("Thank you for your purchase!")',
        okButton: 'button:has-text("OK")',
    }

    async purchase(name: string, country: string, city: string, card: string, month: string, year: string) {
        await this.clickElement(this.cartSelectors.placeOrderBtn);
        const fields = {
            [this.orderFormSelectors.name]: name,
            [this.orderFormSelectors.country]: country, 
            [this.orderFormSelectors.city]: city,
            [this.orderFormSelectors.card]: card,
            [this.orderFormSelectors.month]: month,
            [this.orderFormSelectors.year]: year,
        };

        await this.fillForm(fields);
        await this.clickElement(this.orderFormSelectors.purchaseBtn);
    }

    async deleteProduct(productName: string) {
        const productLocator = this.page.locator(this.cartSelectors.productList).getByText(productName);
        await productLocator.locator('..').getByRole('link').click();
    }

    async getProductPrice(productName: string): Promise<string> {
        const productLocator = this.page.locator(this.cartSelectors.productList).getByText(productName);
        const priceLocator = productLocator.locator('..').locator(this.productSelectors.price);
        const price = await priceLocator.textContent();
        if (price === null) {
            throw new Error(`Price not found for product: ${productName}`);
        }
        return price.trim();
    }

    async getPoroductsLocator(): Promise<any> {
        return this.page.locator(this.cartSelectors.productList).locator('tr');
    }

    async getProductsCount(): Promise<number> {
        return await this.page.locator(this.cartSelectors.product).count();
    }

    async verifyProductPresence(productName: string) {
        const productLocator = this.page.locator(this.cartSelectors.productList).getByText(productName);
        await expect(productLocator).toBeVisible({ timeout: 2000 });
    }

    async verifyProductAbsence(productName: string) {
        const productLocator = this.page.locator(this.cartSelectors.productList).getByText(productName);
        await expect(productLocator).toBeNull();
    }

    async verifyPurchaseSuccess(): Promise<boolean> {
        const successMessage = this.page.locator(this.successPopupSelectors.message);
        return await successMessage.isVisible();
    }

    async verifyPopupClosure() {
        await this.clickElement(this.successPopupSelectors.okButton);
        await this.page.waitForURL('https://demoblaze.com/index.html', { timeout: 5000 });
    }

}