const {
  setupWebDriver,
  getElementById,
  waitForUrlAndCheck,
  getElementByClassName,
  getDivByClassNameAndContent,
  writeObjectToCsv,
} = require("../../../utils/utils");
const willsAsCustomer = require("./wills");
async function casePreview() {
  let log = {
    test: "customer case preview",
    result: "failed",
  };
  let code = 0;
  try {
    code = await willsAsCustomer();
  } catch (error) {
    console.log(error);
  }
  const driver = await setupWebDriver();
  try {
    if (code != 0) {
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
          await driver.get(`${process.env.FRONT_URL}/cases-preview/${code}`);
          const casePreviewPage = waitForUrlAndCheck(
            driver,
            `${process.env.FRONT_URL}/cases-preview/${code}`
          );
          if (casePreviewPage) {
            await driver.sleep(5000);
            const caseIdDiv = await getDivByClassNameAndContent(
              driver,
              "ant-typography sc-dAlyuH iDkslI",
              "Case ID"
            );
            const lawyerDiv = await getDivByClassNameAndContent(
              driver,
              "ant-typography sc-dAlyuH iDkslI",
              "Lawyer"
            );
            const casIdText = await caseIdDiv.getText();
            const caseId = casIdText.split(":").pop();
            const caseIdCount = caseId.length;

            const lawyerText = await lawyerDiv.getText();
            const lawyer = lawyerText.split(":").pop();
            const lawyerCount = lawyer.length;

            if (caseIdCount > 1 && lawyerCount > 1) {
              log = {
                test: "customer case preview",
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
module.exports = casePreview;
