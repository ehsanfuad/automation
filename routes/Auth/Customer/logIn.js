const { Builder, Capabilities, Key, By } = require("selenium-webdriver");
const fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");
const {
  setupWebDriver,
  writeJsonObjectToFile,
} = require("../../../utils/utils");
const chromeOptions = new chrome.Options();

const url = `${process.env.FRONT_URL}/sign-in`;
const SUCCESSFULURL = `${process.env.FRONT_URL}/dashboard`;

let result = "";

async function logIn(email, password) {
  let driver;
  //---------START create web driver--------------//
  // driver = await new Builder()
  //   .forBrowser("chrome")
  //   .setChromeOptions(chromeOptions)
  //   .build();
  driver = await setupWebDriver();
  //---------END--------------//
  try {
    //---------START open url--------------//
    await driver.get(url);
    //---------END--------------//

    //---------START get elements--------------//
    const emailInput = await driver.findElement({ id: "login_email" });
    const passwordInput = await driver.findElement({ id: "login_password" });
    const submitButton = await driver.findElement(
      By.xpath("//button[@type='submit']")
    );
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
    // log = `Log In TEST\n email : ${email} \n password: ${password} \n RESULT: ${result}\n------------------------ \n`;
    log = {
      test: "log in customer",
      email: email,
      password: password,
      result: result,
    };
    writeJsonObjectToFile("log.txt", log);
    // const jsonString = JSON.stringify(log, null, 2) + "\n";
    // try {
    //   fs.appendFileSync("log.txt", jsonString);
    //   console.log("File has been saved.");
    // } catch (error) {
    //   console.error(err);
    // }
    //---------END--------------//
  } finally {
    await driver.quit();
  }
}
module.exports = logIn;
