const signUp = require("./signUp");
const logIn = require("../logIn");
const { writeObjectToCsv, makeEmail } = require("../../../utils/utils");

async function signUpLogin() {
  let email;
  let password;
  let log;
  const signUpEmail = makeEmail();
  const signUpPassword = "P@ssword1";
  try {
    const data = await signUp(signUpEmail, signUpPassword);
    email = data.email;
    password = data.password;
    log = data.log;
  } catch (error) {
    const log = {
      TestTite: "customer sign up",
      result: "FAILED",
      error: "error",
    };
    writeObjectToCsv("log.csv", log);
  }
  try {
    await logIn(email, process.env.PASSWORD, "customer sign in");
  } catch (error) {
    const log = {
      TestTite: "customer sign in",
      result: "FAILED",
      error: "error",
    };
    writeObjectToCsv("log.csv", log);
  }
}

module.exports = signUpLogin;
