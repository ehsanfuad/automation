const { Builder, Capabilities, Key, By } = require("selenium-webdriver");
const fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");
const axios = require("axios");
const { decodeData } = require("../../../utils/hashHelper");
const {
  setupWebDriver,
  writeJsonObjectToFile,
  writeObjectToCsv,
} = require("../../../utils/utils");
const chromeOptions = new chrome.Options();

let log = "";
let result = "";
let verifyToken = null;

const radioValue = "lawyer";
const firstName = "John";
const lastName = "Doe";
// const email = "qauser2010@mailinator.com";
// const password = "P@ssword1";
// const url = "https://staging.lawvo.com/sign-up ";
const url = `${process.env.FRONT_URL}/sign-up`;

async function fetchUserData(email) {
  try {
    // const response = await axios.get("https://stagingapi.lawvo.com/users", {
    const response = await axios.get(`${process.env.Back_URL}/users`, {
      params: {
        email: email,
      },
    });
    console.log("response", response.data.data);
    const data = decodeData(response.data.data);
    console.log("new data", data);
    return data;
  } catch (error) {
    // console.error(error);
  }
}
// async function setupWebDriver() {
//   const driver = await new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(chromeOptions)
//     .build();
//   return driver;
// }
async function signUpCustomer(email, password) {
  let driver;
  const SUCCESSFULURL = `${process.env.FRONT_URL}/thank-you/${email}`;
  //---------START create web driver--------------//
  driver = await setupWebDriver();
  try {
    //---------END--------------//
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
    //---------END--------------//

    //---------START fill from--------------//
    await radio.click();
    await firstNameInput.sendKeys(firstName);
    await lastNameInput.sendKeys(lastName);
    await emailInput.sendKeys(email);
    await passwordInput.sendKeys(password);
    await confirmPasswordInput.sendKeys(password);
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

    //---------START if submition was successful get verify token--------------//
    if (result == "SUCCESSFUL") {
      const user = await fetchUserData(email);
      console.log("USER verify token", user[0].verifyToken);
      verifyToken = user[0].verifyToken;
    } else {
      result = "FAILED";
    }
    //---------END--------------//

    //---------START if token exist verify user--------------//
    console.log("verifyToken", verifyToken);
    if (verifyToken) {
      await driver.get(
        `${process.env.FRONT_URL}/verify-account/${verifyToken}`
      );
    } else {
      // result = "FAILED";
    }
    //---------END--------------//

    //---------START final check sign up--------------//
    if (result == "SUCCESSFUL") {
      const verifiedUser = await fetchUserData(email);
      console.log("verifiedUser TOKEN", verifiedUser[0].isVerified);
      const state = verifiedUser[0].isVerified;
      state ? (result = "SUCCESSFUL") : (result = "FAILED");
    }
    //---------END--------------//
    console.log("STATE", result);
    //---------START write to log file--------------//
    // log = `SIGN UP TEST\n role: ${radioValue} \n first name: ${firstName} \n last name: ${lastName} \n email : ${email} \n password: ${password} \n RESULT: ${result}\n------------------------ \n`;
    log = {
      test: "sign up lawyer",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      result: result,
    };
    writeObjectToCsv("log.csv", log);
    //---------END--------------//
  } finally {
    await driver.quit();
  }
  // RETURN USER AND PASSWORD
  return { email, password, result };
}

// signUpCustomer();
module.exports = signUpCustomer;
