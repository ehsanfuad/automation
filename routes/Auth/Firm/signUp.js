const {
  setupWebDriver,
  getElementById,
  makeEmail,
  getElementByClassName,
  fetchUserData,
  waitForUrlAndCheck,
  writeJsonObjectToFile,
  writeObjectToCsv,
} = require("../../../utils/utils");

async function signUpFrim() {
  const signUpFrimUrl = `${process.env.FRONT_URL}/lawfirm-sign-up`;
  const firstName = "John";
  const lastName = "Doe";
  let verifyToken;
  const email = makeEmail();
  console.log("email:", email);
  let log = {
    TestTitle: "sign up firm",
    result: "FAILED",
    error: "error",
  };
  const password = process.env.PASSWORD;
  const driver = await setupWebDriver();

  try {
    await driver.get(signUpFrimUrl);
    const firstNameInput = await getElementById(driver, "register_firstName");
    const lastNameInput = await getElementById(driver, "register_lastName");
    const emailInput = await getElementById(driver, "register_email");
    const passwordInput = await getElementById(driver, "register_password");
    const confirmPassInput = await getElementById(
      driver,
      "register_repeatPassword"
    );
    await firstNameInput.sendKeys(firstName);
    await lastNameInput.sendKeys(lastName);
    await emailInput.sendKeys(email);
    await passwordInput.sendKeys(password);
    await confirmPassInput.sendKeys(password);
    const submitButton = await getElementById(driver, "signup-button");
    await submitButton.click();
    const thankYouUrl = `${process.env.FRONT_URL}/thank-you/${email}`;
    const step1Done = await waitForUrlAndCheck(driver, thankYouUrl);
    if (step1Done) {
      const user = await fetchUserData(email);

      verifyToken = user[0].verifyToken;
      if (verifyToken) {
        await driver.get(
          `${process.env.FRONT_URL}/verify-account/${verifyToken}`
        );
        const verifiedUser = await fetchUserData(email);
        const state = verifiedUser[0].isVerified;
        console.log("state", state);
        console.log("verifiedUser", verifiedUser);
        state ? (log.result = "SUCCESSFUL") : (log.result = "FAILED");
      }
    }
    writeObjectToCsv("log.csv", log);
  } catch (error) {
  } finally {
    await driver.quit();
  }
  return { email, password, log };
}
module.exports = signUpFrim;
// signUpFrim();
