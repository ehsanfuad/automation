const signUp = require("./signUp");
const logIn = require("../logIn");
const { writeObjectToCsv } = require("../../../utils/utils");

async function signUpLogin() {
  let email;
  let password;
  let log;
  try {
    const data = await signUp();
    email = data.email;
    password = data.password;
    log = data.log;
  } catch (error) {
    const log = {
      TestTite: "partner sign up",
      result: "FAILED",
      error: "error",
    };
    writeObjectToCsv("log.csv", log);
  }
  try {
    await logIn(email, password, "partner sign in");
  } catch (error) {
    const log = {
      TestTite: "partner sign in",
      result: "FAILED",
      error: "error",
    };
    writeObjectToCsv("log.csv", log);
  }
}

// signUpLogin();
module.exports = signUpLogin;
