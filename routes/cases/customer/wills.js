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
  getAllElementsByClassName,
  getAllDivByClassNameAndContent,
  writeObjectToCsv,
} = require("../../../utils/utils");

const { By, until } = require("selenium-webdriver");
async function wills() {
  let code = 0;
  const driver = await setupWebDriver();
  let log = {
    test: "buy a case (wills) as customer",
    result: "failed",
  };
  try {
    await driver.get(process.env.FRONT_URL);

    //get login button
    const loginButton = await getElementById(driver, "signin-button");
    await loginButton.click();
    //fill sign in form
    const signInPage = await waitForUrlAndCheck(
      driver,
      `${process.env.FRONT_URL}/sign-in`
    );
    if (signInPage) {
      const emailInput = await getElementById(driver, "login_email");
      const passwordInput = await getElementById(driver, "login_password");
      const signInButton = await getElementById(driver, "signup-button");
      await emailInput.sendKeys("qa-afd8e840@mailinator.com");
      await passwordInput.sendKeys(process.env.PASSWORD);
      await signInButton.click();
      //get quote button
      const dashboard = await waitForUrlAndCheck(
        driver,
        `${process.env.FRONT_URL}/dashboard`
      );
      if (dashboard) {
        const quoteButtons = await driver.findElements(By.id("get-quote"));
        await quoteButtons[1].click();
        const willsDiv = await getDivByClassNameAndContent(
          driver,
          "ant-typography sc-dAlyuH aaBsU category_item",
          "Wills"
        );
        await driver.sleep(3000);
        await willsDiv.click();
        const willsTitle = await getDivByClassNameAndContent(
          driver,
          "ant-typography sc-dAlyuH cnpXhh service_item",
          "Wills"
        );
        await driver.sleep(3000);
        await willsTitle.click();
        //get finish button if exist
        let isExist = await doesElementExist(driver, "finish-button");
        //click on questions until finish button appear
        await driver.sleep(3000);
        while (!isExist) {
          //get question
          const question = await getDivByClassName(driver, "questions_text");
          //select question
          await question.click();

          //get finish button if exist
          isExist = await doesElementExist(driver, "finish-button");
        }
        //get finish button
        const finishButton = await getElementById(driver, "finish-button");
        // click on finish buttom
        await finishButton.click();
        // check the url
        const expectedUrl = `${process.env.FRONT_URL}/relevant-lawyers`;
        // get result of that check
        const continiue = await waitForUrlAndCheck(driver, expectedUrl);
        // if everything is ok
        if (continiue) {
          //get lawyer button
          const lawyerButton = await getElementById(
            driver,
            "continue-button-0"
          );
          //click lawyer button
          await lawyerButton.click();
          const checkoutUrl = `${process.env.FRONT_URL}/relevant-lawyers/customize-package`;
          // get result of that check
          const ok = await waitForUrlAndCheck(driver, checkoutUrl);
          if (ok) {
            const continiueButton = await getElementById(
              driver,
              "continue-button"
            );
            await continiueButton.click();
            const purchesPage = await waitForUrlAndCheck(
              driver,
              `${process.env.FRONT_URL}/relevant-lawyers/customize-package/purchase-package`
            );
            if (purchesPage) {
              await driver.sleep(5000); // Wait for 5 seconds
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
                const cartExpiration = await getElementByName(
                  driver,
                  "exp-date"
                );
                await cartExpiration.sendKeys("0624");
                await driver.switchTo().defaultContent();

                const cvcIframe = await driver.findElement(
                  By.css('iframe[title="Secure CVC input frame"]')
                );
                await driver.switchTo().frame(cvcIframe);
                const cartCvc = await getElementByName(driver, "cvc");
                await cartCvc.sendKeys("740");
                await driver.switchTo().defaultContent();

                const addButtonCart = await getElementById(
                  driver,
                  "save-button"
                );
                await addButtonCart.click();
                await driver.sleep(9000);
              }
              const purchesButton = await getElementById(
                driver,
                "complete-purchase-button"
              );
              await purchesButton.click();
              const doneUrl = `${process.env.FRONT_URL}/purchase-success`;
              const done = await waitForUrlAndCheck(driver, doneUrl);
              if (done) {
                // const divCode = await getElementByClassName(
                //   driver,
                //   "ant-typography sc-dAlyuH sc-fMMURN hdaVmm dqlopL"
                // );

                const textToFind = " #";
                const xpathExpression = `//span[text()='${textToFind}']`;
                const spanElement = await driver.findElement(
                  By.xpath(xpathExpression)
                );
                code = await spanElement.getText();
                code = code.slice(1);
                log = {
                  test: "buy a case (wills) as customer",
                  result: "successful",
                };
              }
            }
          }
        }
      }
    }
    writeObjectToCsv("log.csv", log);
  } finally {
    await driver.quit();
  }
  return code;
}
module.exports = wills;
// wills();
