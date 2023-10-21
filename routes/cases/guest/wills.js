const {
  setupWebDriver,
  getDivByClassNameAndContent,
  doesElementExist,
  getDivByClassName,
  getElementByClassName,
  waitForUrlAndCheck,
  getCheckboxByClassName,
  getElementById,
  getInputByPlaceH,
  getElementByContentAndType,
  writeJsonObjectToFile,
  getElementByName,
  writeObjectToCsv,
} = require("../../../utils/utils");
const { By } = require("selenium-webdriver");
async function wills() {
  const driver = await setupWebDriver();
  let log = {
    test: "buy a case (wills) as guest",
    result: "failed",
  };
  try {
    await driver.get(process.env.FRONT_URL);
    //get wills case
    const willsDiv = await getElementById(driver, "Wills");
    //select wills case
    await willsDiv.click();

    //get finish button if exist
    let isExist = await doesElementExist(driver, "finish-button");
    //click on questions until finish button appear
    while (!isExist) {
      //get question
      const question = await getDivByClassName(driver, "questions_text");
      //select question
      if (question) {
        await question.click();
      }

      //get finish button if exist
      isExist = await doesElementExist(driver, "finish-button");
    }
    //get finish button
    const finishButton = await getElementById(driver, "finish-button");
    // click on finish buttom
    await finishButton.click();
    // check the url
    const expectedUrl = `${process.env.FRONT_URL}/relevant-lawyers-out`;
    // get result of that check
    const continiue = await waitForUrlAndCheck(driver, expectedUrl);
    // if everything is ok
    if (continiue) {
      //get lawyer button
      const lawyerButton = await getElementById(driver, "continue-button-0");
      //click lawyer button
      await lawyerButton.click();

      const checkoutUrl = `${process.env.FRONT_URL}/relevant-lawyers-out/customize-package`;
      // get result of that check
      const ok = await waitForUrlAndCheck(driver, checkoutUrl);
      if (ok) {
        const continiueButton = await getElementById(driver, "continue-button");
        await continiueButton.click();
        const lastStep = await waitForUrlAndCheck(
          driver,
          checkoutUrl + "/" + "log-in"
        );
        if (lastStep) {
          const alreadyAccount = await getCheckboxByClassName(
            driver,
            "ant-checkbox-input"
          );
          await alreadyAccount.click();
          const emailInput = await getElementById(driver, "login_email");
          const passwordInput = await getElementById(driver, "login_password");
          await emailInput.sendKeys("qa-8b48f990@mailinator.com");
          await passwordInput.sendKeys("P@ssword1");
          const nextButton = await getElementByClassName(
            driver,
            "ant-btn ant-btn-primary sc-aXZVg bITZdF"
          );
          await nextButton.click();
          const purches = await waitForUrlAndCheck(
            driver,
            `${process.env.FRONT_URL}/relevant-lawyers/customize-package/purchase-package`
          );
          if (purches) {
            await driver.sleep(5000); // Wait for 10 seconds

            const isCardExist = await doesElementExist(
              driver,
              "ant-radio-input"
            );
            if (!isCardExist) {
              const cartIframe = await driver.findElement(
                By.css('iframe[title="Secure card number input frame"]')
              );
              await driver.switchTo().frame(cartIframe);
              const cartNumber = await getElementByName(driver, "cardnumber");
              await cartNumber.sendKeys("4242424242424242");
              await driver.switchTo().defaultContent();

              const expirationIframe = await driver.findElement(
                By.css('iframe[title="Secure expiration date input frame"]')
              );
              await driver.switchTo().frame(expirationIframe);
              const cartExpiration = await getElementByName(driver, "exp-date");
              await cartExpiration.sendKeys("0624");
              await driver.switchTo().defaultContent();

              const cvcIframe = await driver.findElement(
                By.css('iframe[title="Secure CVC input frame"]')
              );
              await driver.switchTo().frame(cvcIframe);
              const cartCvc = await getElementByName(driver, "cvc");
              await cartCvc.sendKeys("740");
              await driver.switchTo().defaultContent();

              const addButtonCart = await getElementByClassName(
                driver,
                "ant-btn ant-btn-grey sc-aXZVg hhvzpH"
              );
              await addButtonCart.click();
              await driver.sleep(9000);
            }
            const purchesButton = await getElementByClassName(
              driver,
              "ant-btn ant-btn-primary sc-aXZVg cUULpq"
            );
            await purchesButton.click();
            const doneUrl = `${process.env.FRONT_URL}/purchase-success`;
            const done = await waitForUrlAndCheck(driver, doneUrl);
            if (done) {
              log = {
                test: "buy a case (wills) as guest",
                result: "successful",
              };
            }
          }
        }
      }
    }
    writeObjectToCsv("log.csv", log);
  } finally {
    await driver.quit();
  }
}

module.exports = wills;
// wills();
