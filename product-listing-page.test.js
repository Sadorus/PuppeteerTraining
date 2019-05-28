const puppeteer = require('puppeteer');
const ProductListingPage = require('../Puppeteer/page_objects/ProductListingPage');
const HomePage = require('../Puppeteer/page_objects/HomePage');
const config = require('../Puppeteer/jest-puppeteer.config');

const homePage = new HomePage();
const productListingPage = new ProductListingPage();

let page;
let browser;

beforeAll(async () => {
  await page.goto(homePage.path);
  await page.waitForSelector(homePage.loginPanel);
  await homePage.fillLoginForm();
  await page.waitForSelector(productListingPage.productListing);
});

describe('PLP sort by', () => {
  it('sort products from Z to A', async () => {
    await productListingPage.sortByNameAtoZ();
    browser.close();
  });
  it('sort products from Z to A', async () => {
    await productListingPage.sortByPriceHiLo();
    browser.close();
  });
  it('sort products from Z to A', async () => {
    await productListingPage.sortByPriceLoHi();
    browser.close();
  });
});
