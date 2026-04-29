module.exports = class CheckoutPage {
    constructor(page) {
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.zip = page.getByPlaceholder("Zip/Postal Code");

        this.continue = page.getByRole("button", { name: "Continue" });
        this.finish = page.getByRole("button", { name: "Finish" })

    }

    async checkOutInformation(firstName, lastName, zip) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zip.fill(zip);
    }
    async clickContinue() {
        await this.continue.click();

    }

    async clickFinish() {
        await this.finish.click();

    }

};




