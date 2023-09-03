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
} = require("../../../utils/utils");

async function wills() {
  const driver = await setupWebDriver();
  let log = {
    test: "buy a case (wills) as guest",
    result: "failed",
  };
  try {
    await driver.get(process.env.FRONT_URL);
    //get wills case
    const willsDiv = await getDivByClassNameAndContent(
      driver,
      "popular_legal_searches_categories_services",
      "Wills"
    );
    //select wills case
    await willsDiv.click();

    //get finish button if exist
    let isExist = await doesElementExist(
      driver,
      "ant-btn ant-btn-primary sc-aXZVg cbyKUP"
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
    const expectedUrl = `${process.env.FRONT_URL}/relevant-lawyers-out`;
    // get result of that check
    const continiue = await waitForUrlAndCheck(driver, expectedUrl);
    // if everything is ok
    if (continiue) {
      //get lawyer button
      const lawyerButton = await getElementByClassName(
        driver,
        "ant-btn ant-btn-primary sc-aXZVg fiYrTU"
      );
      //click lawyer button
      await lawyerButton.click();

      const checkoutUrl = `${process.env.FRONT_URL}/relevant-lawyers-out/customize-package`;
      // get result of that check
      const ok = await waitForUrlAndCheck(driver, checkoutUrl);
      if (ok) {
        const continiueButton = await getElementByClassName(
          driver,
          "ant-btn ant-btn-primary sc-aXZVg gZhPjw"
        );
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
          await emailInput.sendKeys("qauser2023@mailinator.com");
          await passwordInput.sendKeys("P@ssword1");
          const nextButton = await getElementByClassName(
            driver,
            "ant-btn ant-btn-primary sc-aXZVg cbyKUP"
          );
          await nextButton.click();
          const purches = await waitForUrlAndCheck(
            driver,
            `${process.env.FRONT_URL}/relevant-lawyers/customize-package/purchase-package`
          );
          if (purches) {
            await driver.sleep(10000); // Wait for 10 seconds

            const isCardExist = await getElementByClassName(
              driver,
              "ant-radio-input"
            );
            if (!isCardExist) {
              const frame = await driver.switchTo().frame(0);
              const cartNumerInput = await getElementByName(
                driver,
                "cardnumber"
              );
              const cartExpireDate = await getElementByName(driver, "exp-date");
              const cartCvc = await getElementByName(driver, "cvc");
              const addButtonCart = await getElementByClassName(
                driver,
                "ant-btn ant-btn-grey sc-aXZVg hhvzpH"
              );
              await cartNumerInput.sendKeys("1234123412341234");
              await cartExpireDate.sendKeys("826");
              await cartCvc.sendKeys("556");
              await addButtonCart.click();
              await driver.switchTo().defaultContent();
            }
            const purchesButton = await getElementByClassName(
              driver,
              "ant-btn ant-btn-primary sc-aXZVg icsNxQ"
            );
            await purchesButton.click();
            const doneUrl = `${process.env.FRONT_URL}/purchase-success`;
            const done = await waitForUrlAndCheck(driver, doneUrl);
            if (done) {
              log = {
                test: "buy a case (wills) as guest",
                result: "successful",
              };
            } else {
              log = {
                test: "buy a case (wills) as guest",
                result: "failed",
              };
            }
          }
        }
      }
    }
    writeJsonObjectToFile("log.txt", log);
  } finally {
    // await driver.quit();
  }
}

wills();
