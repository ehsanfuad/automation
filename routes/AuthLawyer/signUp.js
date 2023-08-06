const { Builder, Capabilities, Key, By } = require("selenium-webdriver");
const fs = require("fs");
const chrome = require("selenium-webdriver/chrome");
const webdriver = require("selenium-webdriver");
const axios = require("axios");
const chromeOptions = new chrome.Options();

let log = "";
let result = "";
let verifyToken = null;

const radioValue = "lawyer";
const firstName = "John";
const lastName = "Doe";
// const email = "qauser2010@mailinator.com";
// const password = "P@ssword1";
const url = "https://app.lawvo.com/sign-up";

async function fetchUserData(email) {
  try {
    const response = await axios.get("https://api.lawvo.com/users", {
      params: {
        email: email,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function signUpCustomer(email, password) {
  let driver;
  const SUCCESSFULURL = `https://app.lawvo.com/thank-you/${email}`;
  try {
    //---------START create web driver--------------//
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
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
      console.log("user", user);
      verifyToken = user.data[0].verifyToken;
    } else {
      result = "FAILED";
    }
    //---------END--------------//

    //---------START if token exist verify user--------------//
    if (verifyToken) {
      await driver.get(`https://app.lawvo.com/verify-account/${verifyToken}`);
    } else {
      result = "FAILED";
    }
    //---------END--------------//

    //---------START final check sign up--------------//
    const verifiedUser = await fetchUserData(email);
    const state = verifiedUser.data[0].isVerified;
    state ? (result = "SUCCESSFUL") : (result = "FAILED");
    //---------END--------------//

    //---------START write to log file--------------//
    // log = `SIGN UP TEST\n role: ${radioValue} \n first name: ${firstName} \n last name: ${lastName} \n email : ${email} \n password: ${password} \n RESULT: ${result}\n------------------------ \n`;
    log = {
      test: "sign up",
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      result: result,
    };
    const jsonString = JSON.stringify(log) + "\n\n";
    try {
      fs.appendFileSync("log.txt", jsonString);
    } catch (error) {
      console.error(err);
    }
    //---------END--------------//
  } finally {
    await driver.quit();
  }
  // RETURN USER AND PASSWORD
  return { email, password, result };
}

// signUpCustomer();
module.exports = signUpCustomer;
