const puppeteer = require('puppeteer');
const ProductListingPage = require('../Puppeteer/page_objects/ProductListingPage');
const HomePage = require('../Puppeteer/page_objects/HomePage');
const config = require('../Puppeteer/jest-puppeteer.config');

let page;
let browser;

const homePage = new HomePage();
const productListingPage = new ProductListingPage();

beforeEach(async () => {
  await page.goto(homePage.path);
  await page.waitForSelector(homePage.loginPanel);
  await homePage.fillLoginForm();
  await page.waitForSelector(productListingPage.productListing);
  await page.click(productListingPage.addToCartButton);
  await page.click(productListingPage.goToShoppingCartButton);
  await page.waitForSelector(productListingPage.cartProductList);
});
describe('Tests on Cart', () => {
  it('Add product to Cart', async () => {
    await page.click(productListingPage.checkoutButton);
    await productListingPage.fillCheckoutInformationForm();
    await page.waitForSelector(productListingPage.checkoutSummaryInfo);
    await page.click(productListingPage.finishOrderButton);
    await page.waitForSelector(productListingPage.completeOrderContainer);
    await page.screenshot({ path: 'CompleteOrder.png' });
    browser.close();
  });
  it('Delete product from Cart', async () => {
    await page.waitForSelector(productListingPage.removeProductButton);
    await page.screenshot({ path: 'RemovedProductListv1.png' });
    await page.click(productListingPage.removeProductButton);
    await page.waitForSelector(productListingPage.removedProductList);
    await page.screenshot({ path: 'RemovedProductList.png' });
    browser.close();
  });
});
