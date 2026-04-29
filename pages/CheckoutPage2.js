class CheckoutPage2 {
    constructor(page) {
        this.page = page;
        this.container = page.locator('#checkout_summary_container');
        this.item = this.container.locator('.cart_item');
        this.itemName = this.item.locator('.inventory_item_name');
        this.itemQuantity = this.item.locator('.cart_quantity');
        this.itemPrice = this.item.locator('.inventory_item_price');

        this.paymentLabel = page.locator('text=Payment Information').locator('..');
        this.shippingLabel = page.locator('text=Shipping Information').locator('..');

        this.itemTotalLabel = page.locator('.summary_subtotal_label');
        this.taxLabel = page.locator('.summary_tax_label');
        this.totalLabel = page.locator('.summary_total_label');

        this.finishButton = page.getByRole('button', { name: 'Finish' });
        // this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.firstName = page.getByPlaceholder("First Name");
        this.lastName = page.getByPlaceholder("Last Name");
        this.zip = page.getByPlaceholder("Zip/Postal Code");
        this.continue = page.getByRole("button", { name: "Continue" });
    }
    async checkOutInformation(firstName, lastName, zip) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zip.fill(zip);
    }
    async clickContinue() {
        await this.continue.click();
    }

    async waitForOverview() {
        await this.container.waitFor();
    }

    async getItemName() {
        return (await this.itemName.first().innerText()).trim();
    }

    async getItemQuantity() {
        return (await this.itemQuantity.first().innerText()).trim();
    }

    async getItemPrice() {
        return (await this.itemPrice.first().innerText()).trim();
    }

    async getPaymentInfoText() {
        return (await this.paymentLabel.first().innerText()).trim();
    }

    async getShippingInfoText() {
        return (await this.shippingLabel.first().innerText()).trim();
    }

    async getItemTotalText() {
        return (await this.itemTotalLabel.first().innerText()).trim();
    }

    async getTaxText() {
        return (await this.taxLabel.first().innerText()).trim();
    }

    async getTotalText() {
        return (await this.totalLabel.first().innerText()).trim();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }
}

module.exports = CheckoutPage2;