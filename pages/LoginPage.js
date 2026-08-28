module.exports = class LoginPage {

    constructor(page) {
        this.page = page;
        this.userName = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.login = page.getByRole("button", { name: "login" });
        this.cor

    }

    async goto() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async validLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.login.click();

    }

    async validInventory() {
        const productpage = await page.locator('span.title').isVisible();

    }
};



