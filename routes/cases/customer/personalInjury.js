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
  writeObjectToCsv,
} = require("../../../utils/utils");
async function personalInjury() {
  const driver = await setupWebDriver();
  let log = {
    test: "buy a case (personal injury) as customer",
    result: "failed",
  };
  try {
    await driver.get(process.env.FRONT_URL);
    //get login button
    const loginButton = await getElementByClassName(driver, "sc-jXbUNg kLdRob");
    await loginButton.click();
    //fill sign in form
    const signInPage = await waitForUrlAndCheck(
      driver,
      `${process.env.FRONT_URL}/sign-in`
    );
    if (signInPage) {
      const emailInput = await getElementById(driver, "login_email");
      const passwordInput = await getElementById(driver, "login_password");
      const signInButton = await getElementByClassName(
        driver,
        "ant-btn ant-btn-primary ant-btn-lg sc-aXZVg kkjWIo"
      );
      await emailInput.sendKeys("qa-afd8e840@mailinator.com");
      await passwordInput.sendKeys(process.env.PASSWORD);
      await signInButton.click();
      const dashboard = await waitForUrlAndCheck(
        driver,
        `${process.env.FRONT_URL}/dashboard`
      );
      if (dashboard) {
        const quoteButtons = await getAllElementsByClassName(
          driver,
          "ant-btn ant-btn-outline sc-aXZVg fiudgN"
        );
        await quoteButtons[1].click();
        await driver.sleep(3000);
        const personalInjury = await getDivByClassNameAndContent(
          driver,
          "ant-typography sc-dAlyuH eSuIwr category_item",
          "Personal Injury"
        );
        await personalInjury.click();
        await driver.sleep(3000);
        const personalInjuryTitle = await getDivByClassNameAndContent(
          driver,
          "ant-typography sc-dAlyuH cqzdcu service_item",
          "Personal Injury Matters"
        );
        await personalInjuryTitle.click();
        let isExist = await doesElementExist(
          driver,
          "ant-btn ant-btn-primary sc-aXZVg cbyKUP"
        );
        await driver.sleep(3000);
        while (!isExist) {
          //get question
          const question = await getDivByClassName(driver, "questions_text");
          //select question
          await question.click();

          //get finish button if exist
          isExist = await doesElementExist(
            driver,
            "ant-btn ant-btn-primary sc-aXZVg cbyKUP"
          );
        }
        //get finish button
        const finishButton = await getElementByClassName(
          driver,
          "ant-btn ant-btn-primary sc-aXZVg cbyKUP"
        );
        // click on finish buttom
        await finishButton.click();
        // check the url
        const expectedUrl = `${process.env.FRONT_URL}/relevant-lawyers`;
        // get result of that check
        const continiue = await waitForUrlAndCheck(driver, expectedUrl);
        // if everything is ok
        if (continiue) {
          await driver.sleep(1500);
          const lawyerButton = await getElementByClassName(
            driver,
            "ant-btn ant-btn-primary sc-aXZVg fNCWkA"
          );
          await lawyerButton.click();
          const checkoutUrl = `${process.env.FRONT_URL}/relevant-lawyers/customize-package`;
          const ok = await waitForUrlAndCheck(driver, checkoutUrl);
          if (ok) {
            const continiueButton = await getElementByClassName(
              driver,
              "ant-btn ant-btn-primary sc-aXZVg gZhPjw"
            );
            await continiueButton.click();
            await driver.sleep(3000); // Wait for 3 seconds
            const purchesButton = await getElementByClassName(
              driver,
              "ant-btn ant-btn-primary sc-aXZVg icsNxQ"
            );
            await purchesButton.click();
            const doneUrl = `${process.env.FRONT_URL}/purchase-success`;
            const done = await waitForUrlAndCheck(driver, doneUrl);
            if (done) {
              log = {
                test: "buy a case (personal injury) as customer",
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
module.exports = personalInjury;
// personalInjury();
