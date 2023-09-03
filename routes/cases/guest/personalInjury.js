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

async function personalInjury() {
  const driver = await setupWebDriver();
  let log = {
    test: "buy a case (personal injury) as guest",
    result: "failed",
  };
  try {
    await driver.get(process.env.FRONT_URL);
    await driver.sleep(10000);
    const personalInjuryDev = await getDivByClassNameAndContent(
      driver,
      "popular_legal_searches_categories_services",
      "Personal Injury Matters"
    );
    //select personal injury case
    await personalInjuryDev.click();

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
    if (continiue) {
      //get lawyer button
      const lawyerButton = await getElementByClassName(
        driver,
        "ant-btn ant-btn-primary sc-aXZVg fNCWkA"
      );
      //click lawyer button
      await lawyerButton.click();
      const checkoutUrl = `${process.env.FRONT_URL}/relevant-lawyers-out/customize-package`;
      // get result of that check
      const ok = await waitForUrlAndCheck(driver, checkoutUrl);
      if (ok) {
        console.log("boro doroste");
      }
    }
  } finally {
    // await driver.quit();
  }
}

personalInjury();
