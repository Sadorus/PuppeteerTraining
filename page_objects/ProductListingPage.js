/* eslint-disable no-shadow */
module.exports = class ProdutctListingPage {
  constructor() {
    this.completeOrderContainer = 'div[id="checkout_complete_container"]';
    this.finishOrderButton = 'a[class="btn_action cart_button"]';
    this.checkoutSummaryInfo = 'div[id="checkout_summary_container"]';
    this.checkoutInformationForm = {
      fields: {
        firstNameInput: 'input[id="first-name"]',
        lastNameInput: 'input[id="last-name"]',
        postalCodeInput: 'input[id="postal-code"]',
        continueButton: 'input[class="btn_primary cart_button"]',
      },
    };
    this.checkoutButton = 'a[class*="checkout_button"]';
    this.cartProductList = 'div[class="cart_list"]';
    this.removedProductList = 'div[class="removed_cart_item"]';
    this.removeProductButton = 'button[class="btn_secondary cart_button"]';
    this.goToShoppingCartButton = 'div[id="shopping_cart_container"]';
    this.addToCartButton = 'button[class="btn_primary btn_inventory"]';
    this.sortByContainer = 'select[class="product_sort_container"]';
    this.sortByNameAtoZOption = 'option[value="za"]';
    this.sortByPriceHiLoOption = 'option[value="hilo"]';
    this.sortByPriceLoHiOption = 'option[value="lohi"]';
    this.productListing = 'div[id="inventory_container"][class="inventory_container"]';
    // eslint-disable-next-line no-shadow
    this.eachProductNameGetText = eachName => eachName.map(eachName => eachName.textContent);
    this.eachProductPriceGetText = eachPrice => eachPrice.map(eachPrice => eachPrice.textContent.slice(1));
  }

  async fillCheckoutInformationForm() {
    await page.type(this.checkoutInformationForm.fields.firstNameInput, 'Mateusz');
    await page.type(this.checkoutInformationForm.fields.lastNameInput, 'Błoch');
    await page.type(this.checkoutInformationForm.fields.postalCodeInput, '85-590');
    await page.click(this.checkoutInformationForm.fields.continueButton);
  }

  async sortByNameAtoZ() {
    let productNames = await page.$$eval('div[class="inventory_item_name"]', this.eachProductNameGetText);
    let sortedProductNames = productNames.slice();
    sortedProductNames = productNames.reverse();
    await page.waitForSelector('select.product_sort_container');
    await page.click('select.product_sort_container');
    await page.select('.product_sort_container', 'za');
    productNames = await page.$$eval('div[class="inventory_item_name"]', eachName => eachName.map(eachName => eachName.textContent));
    const sortedProductNamesCheck = productNames;
    expect(sortedProductNames).toEqual(sortedProductNamesCheck);
  }

  async sortByPriceHiLo() {
    let productPrices = await page.$$eval('div[class="inventory_item_price"]', this.eachProductPriceGetText);
    let sortedProductPrices = productPrices.slice();
    sortedProductPrices = sortedProductPrices.sort((a, b) => b - a);
    await page.waitForSelector('select.product_sort_container');
    await page.click('select.product_sort_container');
    await page.select('.product_sort_container', 'hilo');
    productPrices = await page.$$eval('div[class="inventory_item_price"]', eachPrice => eachPrice.map(eachPrice => eachPrice.textContent.slice(1)));
    const sortedProductPricesCheck = productPrices;
    expect(sortedProductPrices).toEqual(sortedProductPricesCheck);
  }

  async sortByPriceLoHi() {
    let productPrices = await page.$$eval('div[class="inventory_item_price"]', this.eachProductPriceGetText);
    let sortedProductPrices = productPrices.slice();
    sortedProductPrices = sortedProductPrices.sort((a, b) => a - b);
    await page.waitForSelector('select.product_sort_container');
    await page.click('select.product_sort_container');
    await page.select('.product_sort_container', 'lohi');
    productPrices = await page.$$eval('div[class="inventory_item_price"]', eachPrice => eachPrice.map(eachPrice => eachPrice.textContent.slice(1)));
    const sortedProductPricesCheck = productPrices;
    expect(sortedProductPrices).toEqual(sortedProductPricesCheck);
  }
};
