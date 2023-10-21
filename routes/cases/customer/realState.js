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
async function realState() {
  const driver = await setupWebDriver();
  let log = {
    test: "buy a case (real state) as customer",
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
        const realEstate = await getDivByClassNameAndContent(
          driver,
          "ant-typography sc-dAlyuH eSuIwr category_item",
          "Real Estate"
        );
        await realEstate.click();
        await driver.sleep(3000);
        const realEstateTitle = await getDivByClassNameAndContent(
          driver,
          "ant-typography sc-dAlyuH cqzdcu service_item",
          "Buying a Home1"
        );
        await realEstateTitle.click();
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
            "ant-btn ant-btn-primary sc-aXZVg fiYrTU"
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
            const purchesPage = await waitForUrlAndCheck(
              driver,
              `${process.env.FRONT_URL}/relevant-lawyers/customize-package/purchase-package`
            );
            if (purchesPage) {
              await driver.sleep(3000); // Wait for 3 seconds
              const purchesButton = await getElementByClassName(
                driver,
                "ant-btn ant-btn-primary sc-aXZVg cRDJgE"
              );
              await purchesButton.click();
              const doneUrl = `${process.env.FRONT_URL}/purchase-success`;
              const done = await waitForUrlAndCheck(driver, doneUrl);
              if (done) {
                log = {
                  test: "buy a case (real estate) as customer",
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
}
module.exports = realState;
// realState();
