import { Page, Locator, expect } from '@playwright/test';

export default abstract class BasePage {
    protected constructor(protected page: Page) {}

    
    private readonly titleBarSelectors = {
        homeBtn: 'a:has-text("Home")',
        contactBtn: '',
        aboutUsBtn: 'a:has-text("About")',
        cartBtn: '#cartur',
        loginBtn: '#login2',
        signupBtn: '#signin2',
        logoutBtn: '#logout2',
    }

    private readonly contactSelectors = {
        name: '#recipient-name',
        email: '#recipient-email',
        message: '#message-text',
        sendButton: 'button:has-text("Send message")',
    }

    private readonly loginSelectors = {
        username: '#loginusername',
        password: '#loginpassword',
        loginButton: 'button:has-text("Log in")',
    }

    private readonly signupSelectors = {
        username: '#sign-username',
        password: '#sign-password',
        signupButton: 'button:has-text("Sign up")',
    }

    // Common method to type into any input field
    protected async typeIntoLocator(locator: string, value: string) {
        await this.page.locator(locator).fill(value);
    }

    // Common method to click any element
    protected async clickElement(locator: string, options: { timeout?: number } = {}) {
        const { timeout = 25000 } = options;
        await this.page.locator(locator).click({ timeout });
    }

    // Common method to verify text content
    protected async verifyText(locator: string, expectedText: string, exact: boolean = false) {
        if (exact) {
            await expect(this.page.locator(locator)).toHaveText(expectedText);
        } else {
            // Use contains for partial matching and normalize whitespace
            await expect(this.page.locator(locator)).toContainText(expectedText);
        }
    }

    protected async verifyTextWithOptions(
        locator: string,
        expectedText: string,
        options: {
            exact?: boolean;
            normalizeWhitespace?: boolean;
            timeout?: number;
        } = {},
    ) {
        const { exact = false, normalizeWhitespace = true, timeout = 5000 } = options;

        if (normalizeWhitespace) {
            await expect(this.page.locator(locator)).toHaveText(new RegExp(expectedText.replace(/\s+/g, '\\s+')), {
                timeout,
            });
        } else if (exact) {
            await expect(this.page.locator(locator)).toHaveText(expectedText, { timeout });
        } else {
            await expect(this.page.locator(locator)).toContainText(expectedText, { timeout });
        }
    }

    // Common method to verify element visibility
    protected async verifyElementVisible(locator: string, options: { timeout?: number } = {}) {
        const { timeout = 25000 } = options;
        await expect(this.page.locator(locator)).toBeVisible({ timeout });
    }

    // Common method to capture screenshots
    public async captureScreenshot(screenshotName: string, fullPage: boolean = false) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await this.page.screenshot({
            path: `screenshots/${screenshotName}-${timestamp}.png`,
            fullPage,
        });
    }

    // Common method to fill out a form with multiple fields
    protected async fillForm(fields: { [key: string]: string }) {
        for (const [locator, value] of Object.entries(fields)) {
            await this.typeIntoLocator(locator, value);
        }
    }

    // Common method to navigate to a URL
    protected async navigate(url: string) {
        await this.page.goto(url);
    }

    async navigateToHome() {
        await this.clickElement(this.titleBarSelectors.homeBtn);
    }

    async navigateToCart() {
        await this.clickElement(this.titleBarSelectors.cartBtn);
    }

    async contact(email: string, name: string, message: string) {
        await this.clickElement(this.titleBarSelectors.contactBtn);
        const fields = {
            [this.contactSelectors.name]: name,
            [this.contactSelectors.email]: email,
            [this.contactSelectors.message]: message,
        };
        
        await this.fillForm(fields);
        await this.clickElement(this.contactSelectors.sendButton);
    }

    async login(username: string, password: string) {
        await this.clickElement(this.titleBarSelectors.loginBtn);
        const fields = {
            [this.loginSelectors.username]: username,
            [this.loginSelectors.password]: password,
        };

        await this.fillForm(fields);
        await this.clickElement(this.loginSelectors.loginButton);
    }

    async signup(username: string, password: string) {
        await this.clickElement(this.titleBarSelectors.signupBtn);
        const fields = {
            [this.signupSelectors.username]: username,
            [this.signupSelectors.password]: password,
        };

        await this.fillForm(fields);
        await this.clickElement(this.signupSelectors.signupButton);
    }

    // Common method to get text content
    protected async getTextContent(locator: string): Promise<string | null> {
        return await this.page.locator(locator).textContent();
    }
}