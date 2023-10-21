const {
  setupWebDriver,
  getElementById,
  getElementByClassName,
  writeJsonObjectToFile,
  writeObjectToCsv,
} = require("../../../utils/utils");

async function forgotPassword(email) {
  const driver = await setupWebDriver();
  const forgotPasswordUrl = `${process.env.FRONT_URL}/forgot-password`;
  let log = {
    TestTitle: "forgot password",
    result: "FAILED",
    error: null,
  };
  try {
    await driver.get(forgotPasswordUrl);
    const forgotPassInput = await getElementById(driver, "forgot_email");
    const emailMeButton = await getElementById(driver, "signup-button");
    await forgotPassInput.sendKeys(email);
    await emailMeButton.click();

    log.result = "SUCCESSFUL";
    writeObjectToCsv("log.csv", log);
  } catch (error) {
    let log = {
      TestTitle: "forgot password",
      result: "FAILED",
      error: "error",
    };
    writeObjectToCsv("log.csv", log);
  } finally {
    await driver.quit();
  }
}
// forgotPassword();
module.exports = forgotPassword;
