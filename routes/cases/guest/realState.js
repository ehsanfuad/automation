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
async function realState() {
  const driver = await setupWebDriver();
  let log = {
    test: "buy a case (real state) as guest",
    result: "failed",
  };

  try {
    await driver.get(process.env.FRONT_URL);
    await driver.sleep(10000);
    const realStateDiv = await getDivByClassNameAndContent(
      driver,
      "popular_legal_searches_categories_services",
      "Buying a Home1"
    );
    //select personal injury case
    await realStateDiv.click();
    //get finish button if exist
    let isExist = await doesElementExist(
      driver,
      "ant-btn ant-btn-primary sc-aXZVg bITZdF"
    );
    //click on questions until finish button appear
    while (!isExist) {
      //get question
      const question = await getDivByClassName(driver, "questions_text");
      //select question
      await question.click();

      //get finish button if exist
      isExist = await doesElementExist(
        driver,
        "ant-btn ant-btn-primary sc-aXZVg bITZdF"
      );
    }
    //get finish button
    const finishButton = await getElementByClassName(
      driver,
      "ant-btn ant-btn-primary sc-aXZVg bITZdF"
    );
    // click on finish buttom
    await finishButton.click();
    // check the url
    const expectedUrl = `${process.env.FRONT_URL}/relevant-lawyers-out`;
    // get result of that check
    const continiue = await waitForUrlAndCheck(driver, expectedUrl);
    if (continiue) {
      //get lawyer button
      const lawyerButton = await getElementByClassName(
        driver,
        "ant-btn ant-btn-primary sc-aXZVg eJmRsW"
      );
      //click lawyer button
      await lawyerButton.click();
      const checkoutUrl = `${process.env.FRONT_URL}/relevant-lawyers-out/customize-package`;
      // get result of that check
      const ok = await waitForUrlAndCheck(driver, checkoutUrl);
      if (ok) {
        const continiueButton = await getElementByClassName(
          driver,
          "ant-btn ant-btn-primary sc-aXZVg cJVKaW"
        );
        await continiueButton.click();
        const loginPage = await waitForUrlAndCheck(
          driver,
          checkoutUrl + "/" + "log-in"
        );
        if (loginPage) {
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
          const purchesPage = await waitForUrlAndCheck(
            driver,
            `${process.env.FRONT_URL}/relevant-lawyers/customize-package/purchase-package`
          );
          if (purchesPage) {
            await driver.sleep(5000); // Wait for 5 seconds
            const purchesButton = await getElementByClassName(
              driver,
              "ant-btn ant-btn-primary sc-aXZVg bJua-dW"
            );
            await purchesButton.click();
            const doneUrl = `${process.env.FRONT_URL}/purchase-success`;
            const done = await waitForUrlAndCheck(driver, doneUrl);
            if (done) {
              log = {
                test: "buy a case (real state) as guest",
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
module.exports = realState;
// realState();
