const { Builder, Capabilities, Key, By } = require("selenium-webdriver");
const fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");
const axios = require("axios");
const chromeOptions = new chrome.Options();

let log = "";
let reasonFailure = "NONE";
let result = "";

const filePath = "log.txt";
const radioValue = "customer";
const firstName = "John";
const lastName = "Doe";
const email = "qauser2006@mailinator.com";
const password = "P@ssword1";
const url = "https://app.lawvo.com/sign-up";
const SUCCESSFULURL = `https://app.lawvo.com/thank-you/${email}`;
const getUserUrl = `https://api.lawvo.com/users?email=${email}`;

async function signUpCustomer() {
  try {
    //---------START create web driver--------------//
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    //---------END create web driver--------------//
    await driver.get(url);
    //---------START get elements--------------//
    const radio = await driver.findElement(
      By.xpath(`//input[@type='radio' and @value='${radioValue}']`)
    );

    const firstNameInput = await driver.findElement({
      id: "register_firstName",
    });

    const lastNameInput = await driver.findElement({
      id: "register_lastName",
    });
    const emailInput = await driver.findElement({ id: "register_email" });
    const passwordInput = await driver.findElement({ id: "register_password" });
    const confirmPasswordInput = await driver.findElement({
      id: "register_repeatPassword",
    });
    const submitButton = await driver.findElement(
      By.xpath("//button[@type='submit']")
    );
    //---------END get elements--------------//

    //---------START fill from--------------//
    await radio.click();
    await firstNameInput.sendKeys(firstName);
    await lastNameInput.sendKeys(lastName);
    await emailInput.sendKeys(email);
    await passwordInput.sendKeys(password);
    await confirmPasswordInput.sendKeys(password);
    await submitButton.click();
    //---------END fill form--------------//

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
    //---------END check data entry--------------//

    //---------START if submition was successful get verify token--------------//

    const user = await axios.get(apiUrl, {
      params: {
        email: email,
      },
    });
    console.log("user.data", user.data);
    //---------END if submition was successful get verify token--------------//

    //---------START if token exist verify user--------------//
    //---------END if token exist verify user--------------//

    //---------START write to log file--------------//
    log = `SIGN UP TEST\n role: ${radioValue} \n first name: ${firstName} \n last name: ${lastName} \n email : ${email} \n password: ${password} \n RESULT: ${result}\n------------------------ \n`;
    try {
      fs.appendFileSync("log.txt", log);
      console.log("File has been saved.");
    } catch (error) {
      console.error(err);
    }
    //---------END write to log file--------------//
  } finally {
    await driver.quit();
  }
}

signUpCustomer();
