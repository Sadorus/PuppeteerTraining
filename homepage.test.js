/* eslint-disable no-useless-escape */
// const puppeteer = require('puppeteer');
const HomePage = require('./page_objects/HomePage');

const homePage = new HomePage();
describe('Homepage', () => {
  beforeAll(async () => {
    await page.goto(homePage.path);
    await page.waitForSelector(homePage.loginPanel);
  });
  it('Log into your account', async () => {
    await homePage.fillLoginForm();
    await expect(page).toMatchElement(homePage.productList);
    await page.screenshot({ path: 'example.png' });
  });
});
