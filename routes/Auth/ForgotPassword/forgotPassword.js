const {
  setupWebDriver,
  getElementById,
  getElementByClassName,
  writeJsonObjectToFile,
} = require("../../../utils/utils");

async function forgotPassword(email) {
  const driver = await setupWebDriver();
  const forgotPasswordUrl = `${process.env.FRONT_URL}/forgot-password`;
  let log = {
    test: "forgot password",
    result: "failed",
    email,
  };
  try {
    await driver.get(forgotPasswordUrl);
    const forgotPassInput = await getElementById(driver, "forgot_email");
    const emailMeButton = await getElementByClassName(
      driver,
      "ant-btn ant-btn-primary ant-btn-lg sc-aXZVg kkjWIo"
    );
    await forgotPassInput.sendKeys(email);
    await emailMeButton.click();

    log.result = "SUCCESSFUL";
    writeJsonObjectToFile("log.txt", log);
  } catch (error) {
  } finally {
    await driver.quit();
  }
}
// forgotPassword();
module.exports = forgotPassword;
