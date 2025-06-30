import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ProductDetailPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly productSelectors = {
        addToCartBtn: 'a:has-text("Add to cart")',
    }

    async addProductToCart() {
        await this.clickElement(this.productSelectors.addToCartBtn);
    }
}