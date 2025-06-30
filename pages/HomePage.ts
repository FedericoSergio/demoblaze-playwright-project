import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    private readonly productSelectors = {
        pic: 'xpath = /a/img',
        title: 'xpath = /div/h4/a',
        price: 'xpath = /div/h5',
        description: '#article',
    }

    async selectProduct(productName: string) {
        await this.page.getByRole('link', { name: productName }).click();
    }

}