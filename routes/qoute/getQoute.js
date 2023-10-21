const { By } = require("selenium-webdriver");
const {
  setupWebDriver,
  getElementById,
  waitForUrlAndCheck,
} = require("../../utils/utils");

async function getQoute() {
  const driver = await setupWebDriver();
  try {
    await driver.get(process.env.FRONT_URL);
    const signInButton = await getElementById(driver, "signin-button");
    await signInButton.click();
    const signUpPage = await waitForUrlAndCheck(
      driver,
      `${process.env.FRONT_URL}/sign-in`
    );
    if (signUpPage) {
      const email = await getElementById(driver, "login_email");
      const password = await getElementById(driver, "login_password");
      const logInButton = await getElementById(driver, "signup-button");

      await email.sendKeys("qa-47cea0d0@mailinator.com");
      await password.sendKeys(process.env.PASSWORD);
      await logInButton.click();

      const dashboardPage = await waitForUrlAndCheck(
        driver,
        `${process.env.FRONT_URL}/dashboard`
      );
      if (dashboardPage) {
        await driver.sleep(5000);
        const qouteButton = await driver.findElements(By.id("get-quote"));
        await qouteButton[1].click();
      }
    }
  } finally {
    await driver.quit();
  }
}

module.exports = getQoute;
