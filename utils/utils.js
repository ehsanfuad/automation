const { Builder, By } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const uuid = require("uuid");
const axios = require("axios");
const fs = require("fs").promises;
const chrome = require("selenium-webdriver/chrome");
const { decodeData, codeData } = require("./hashHelper");
const chromeOptions = new chrome.Options();
require("dotenv").config();

const chromePath = "E:/automation-master/chromedriver";
async function setupWebDriver() {
  const isWindows = process.env.IS_WINDOWS;
  if (isWindows == "true") {
    //------------WINDOWS-------------//
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .setChromeService(new chrome.ServiceBuilder(chromePath))
      .build();
    return driver;
    //------------END WINDOWS-------------//
  } else {
    // ----------LINUX------------//
    let builder = new Builder().forBrowser("chrome");
    let options = new Options();
    options.headless(); // run headless Chrome
    options.excludeSwitches(["enable-logging"]); // disable 'DevTools listening on...'
    options.addArguments(["--no-sandbox"]); // not an advised flag but eliminates "DevToolsActivePort file doesn't exist" error.
    let driver = await builder.setChromeOptions(options).build();
    return driver;
    // ----------END LINUX------------//
  }
}

async function getDivByClassNameAndContent(driver, className, content) {
  try {
    const xpathExpression = `//div[contains(@class, '${className}') and contains(text(), '${content}')]`;
    const divElement = await driver.findElement(By.xpath(xpathExpression));
    return divElement;
  } catch (error) {
    console.error("An error occurred for getDivByClassNameAndContent:", error);
  }
}

async function getDivByClassName(driver, className) {
  try {
    const xpathExpression = `//div[contains(@class, '${className}')]`;
    const divElement = await driver.findElement(By.xpath(xpathExpression));
    return divElement;
  } catch (error) {
    console.error("An error occurred getDivByClassName :", error);
    return null;
  }
}

async function doesElementExist(driver, className) {
  try {
    await driver.findElement(By.className(className));
    return true; // Element exists
  } catch (error) {
    return false; // Element does not exist
  }
}

async function getElementByClassName(driver, className) {
  try {
    const element = await driver.findElement(By.className(className));
    return element;
  } catch (error) {
    console.error("An error occurred getElementByClassName:", error);
    return null;
  }
}

async function getElementByName(driver, name) {
  try {
    const element = await driver.findElement(By.name(name));
    return element;
  } catch (error) {
    console.error("An error occurred getElementByName:", error);
    return null;
  }
}

async function waitForUrlAndCheck(driver, expectedUrl) {
  try {
    await driver.sleep(30000); // Wait for 30 seconds
    const currentURL = await driver.getCurrentUrl();
    return currentURL === expectedUrl;
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
}

async function getCheckboxByClassName(driver, className) {
  try {
    const selector = `input[type="checkbox"].${className}`;
    const checkboxElement = await driver.findElement(By.css(selector));
    return checkboxElement;
  } catch (error) {
    console.error("An error occurred getCheckboxByClassName:", error);
    return null;
  }
}

async function getElementById(driver, id) {
  try {
    const element = await driver.findElement(By.id(id));
    return element;
  } catch (error) {
    console.error("An error occurred getElementById:", error);
    return null;
  }
}

async function getInputByPlaceH(driver, placeholderText) {
  try {
    const inputElement = await driver.findElement(
      By.css(`input[placeholder="${placeholderText}"]`)
    );
    return element;
  } catch (error) {
    console.error("An error occurred getInputByPlaceH:", error);
    return null;
  }
}

async function getElementByContentAndType(driver, elementType, elementContent) {
  try {
    const elementSelector = `${elementType}[value="${elementContent}"]`;
    const element = await driver.findElement(By.css(elementSelector));
    return element;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}
async function writeJsonObjectToFile(filePath, newJsonObject) {
  try {
    const datetime = new Date();

    // Add date and time properties to the newJsonObject
    newJsonObject["date"] = datetime.toISOString().slice(0, 10);
    newJsonObject["time"] = datetime.toTimeString().slice(0, 8);

    let existingData = "";

    try {
      existingData = await fs.readFile(filePath, "utf-8");
    } catch (readError) {
      // File doesn't exist, so it will be created
    }

    existingData = existingData.trim(); // Remove any leading/trailing whitespace

    let existingJsonArray = [];
    if (existingData) {
      existingJsonArray = JSON.parse(existingData);
      if (!Array.isArray(existingJsonArray)) {
        throw new Error("Existing data in the file is not a valid JSON array.");
      }
    }

    // If the existing array doesn't exist, create a new one
    if (!Array.isArray(existingJsonArray)) {
      existingJsonArray = [];
    }

    existingJsonArray.push(newJsonObject);

    const updatedJsonString = JSON.stringify(existingJsonArray, null, 2);

    // Create the file if it doesn't exist
    try {
      await fs.writeFile(filePath, updatedJsonString, "utf-8");
      console.log("New JSON object added to file successfully.");
    } catch (writeError) {
      console.error("Error writing to file:", writeError);
    }
  } catch (error) {
    console.error("Error appending JSON object to file:", error);
  }
}
function makeEmail() {
  let id = uuid.v1();
  id = id.substring(0, id.indexOf("-"));
  const email = `qa-${id}@mailinator.com`;
  return email.toString();
}
async function fetchUserData(email) {
  try {
    const response = await axios.get(`${process.env.Back_URL}/users`, {
      params: {
        email: email,
      },
    });
    const data = decodeData(response.data.data);
    console.log("new data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function postData(endPoint, params) {
  try {
    const response = await axios.post(`${process.env.Back_URL}/${endPoint}`, {
      hash: params,
    });
    const data = decodeData(response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  setupWebDriver,
  getDivByClassNameAndContent,
  getDivByClassName,
  doesElementExist,
  getElementByClassName,
  waitForUrlAndCheck,
  getCheckboxByClassName,
  getElementById,
  getInputByPlaceH,
  getElementByContentAndType,
  writeJsonObjectToFile,
  getElementByName,
  makeEmail,
  fetchUserData,
  postData,
};
