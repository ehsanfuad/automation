const { Builder, Capabilities, Key, By } = require("selenium-webdriver");
const fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");
const {
  setupWebDriver,
  writeJsonObjectToFile,
  writeObjectToCsv,
  getElementById,
} = require("../../utils/utils");

const url = `${process.env.FRONT_URL}/sign-in`;
const SUCCESSFULURL = `${process.env.FRONT_URL}/dashboard`;

let result = "";

async function logIn(email, password, testTitle) {
  let driver;
  driver = await setupWebDriver();
  //---------END--------------//
  try {
    //---------START open url--------------//
    await driver.get(url);
    //---------END--------------//

    //---------START get elements--------------//
    const emailInput = await getElementById(driver, "login_email");
    const passwordInput = await getElementById(driver, "login_password");
    const submitButton = await getElementById(driver, "signup-button");
    //---------END--------------//
    //---------START fill from--------------//
    await emailInput.sendKeys(email);
    await passwordInput.sendKeys(password);
    await submitButton.click();
    //---------END--------------//

    //---------START check data entry--------------//
    await driver
      .wait(webdriver.until.urlIs(SUCCESSFULURL), 9000)
      .then((isSuccess) => {
        if (isSuccess) {
          result = "SUCCESSFUL";
        } else {
          result = "FAILED";
        }
      })
      .catch((error) => {
        result = "FAILED " + "An error occurred:" + error;
      });
    const currentURL = await driver.getCurrentUrl();
    currentURL == url ? (result = "FAILED") : (result = "SUCCESSFUL");
    //---------END--------------//

    //---------START write to log file--------------//
    const log = {
      TestTite: testTitle,
      result: "SUCCESSFUL",
      error: null,
    };
    writeObjectToCsv("log.csv", log);
    //---------END--------------//
  } finally {
    // await driver.quit();
  }
}
module.exports = logIn;
