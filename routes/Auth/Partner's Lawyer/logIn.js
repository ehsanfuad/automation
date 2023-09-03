const {
  setupWebDriver,
  getElementById,
  getElementByClassName,
  waitForUrlAndCheck,
  writeJsonObjectToFile,
} = require("../../../utils/utils");

async function logIn(email, password) {
  const url = `${process.env.FRONT_URL}/sign-in`;
  const driver = await setupWebDriver();
  let log = {
    test: "Sign in Partner's Lawyer",
    result: "failed",
    email,
  };
  try {
    await driver.get(url);
    const emailInput = await getElementById(driver, "login_email");
    const passwordInput = await getElementById(driver, "login_password");
    const logInButton = await getElementByClassName(
      driver,
      "ant-btn ant-btn-primary ant-btn-lg sc-aXZVg kkjWIo"
    );
    await emailInput.sendKeys(email);
    await passwordInput.sendKeys(password);
    await logInButton.click();
    const dashboardUrl = `${process.env.FRONT_URL}/dashboard`;
    const step1Done = await waitForUrlAndCheck(driver, dashboardUrl);
    step1Done ? (log.result = "SUCCESSFUL") : (log.result = "FAILED");
    writeJsonObjectToFile("log.txt", log);
  } catch (error) {
  } finally {
    await driver.quit();
  }
}

// logIn();
module.exports = logIn;
