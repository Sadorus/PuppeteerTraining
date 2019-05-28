module.exports = class HomePage {
  constructor() {
    this.path = 'https://www.saucedemo.com/index.html';
    this.loginPanel = '#login_button_container';
    this.productList = 'div[class="inventory_container"]';
    this.loginForm = {
      fields: {
        usernameInput: 'input[id="user-name"]',
        passwordInput: 'input[id="password"]',
        logInButton: 'input[class="btn_action"]',
      },
    };
  }

  async fillLoginForm() {
    await page.type(this.loginForm.fields.usernameInput, 'standard_user');
    await page.type(this.loginForm.fields.passwordInput, 'secret_sauce');
    await page.click(this.loginForm.fields.logInButton);
  }
};
