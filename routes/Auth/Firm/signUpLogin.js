const signUp = require("./signUp");
const logIn = require("../logIn");

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
      TestTite: "firm sign up",
      result: "FAILED",
      error: "error",
    };
    writeObjectToCsv("log.csv", log);
  }
  try {
    await logIn(email, password, "firm sign in");
  } catch (error) {
    const log = {
      TestTite: "firm sign in",
      result: "FAILED",
      error: "error",
    };
    writeObjectToCsv("log.csv", log);
  }
}

// signUpLogin();
module.exports = signUpLogin;
