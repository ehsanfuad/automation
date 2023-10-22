//lawyer accept button add id
const {
  setupWebDriver,
  getElementById,
  waitForUrlAndCheck,
  getElementByClassName,
} = require("../../../utils/utils");
const willsAsCustomer = require("../customer/wills");
async function casePreview() {
  let log = {
    test: "lawyer case preview",
    result: "failed",
  };
  let code = 494;
  //   try {
  //     code = await willsAsCustomer();
  //   } catch (error) {
  //     console.log(error);
  //   }

  const driver = await setupWebDriver();
  try {
    if (code != 0) {
      await driver.get(process.env.FRONT_URL);
      const loginButton = await getElementById(driver, "signin-button");
      await loginButton.click();
      const signInPage = await waitForUrlAndCheck(
        driver,
        `${process.env.FRONT_URL}/sign-in`
      );
      if (signInPage) {
        const emailInput = await getElementById(driver, "login_email");
        const passwordInput = await getElementById(driver, "login_password");
        const signInButton = await getElementById(driver, "signup-button");
        await emailInput.sendKeys("hovsepation@gmail.com");
        await passwordInput.sendKeys("123456");
        await signInButton.click();
        const dashboard = await waitForUrlAndCheck(
          driver,
          `${process.env.FRONT_URL}/dashboard`
        );
        if (dashboard) {
          await driver.get(`${process.env.FRONT_URL}/cases`);
          await driver.sleep(5000);
          const inputCaseId = await getElementById(driver, "id");
          await inputCaseId.sendKeys(code);
          const accButton = await getElementByClassName(
            driver,
            "ant-btn ant-btn-accept sc-aXZVg gXmxas"
          );
          if (accButton) {
            await accButton.click();
          }
        }
      }
    }
  } finally {
    // await driver.quit();
  }
}
module.exports = casePreview;
