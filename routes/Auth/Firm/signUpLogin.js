const signUp = require("./signUp");
const logIn = require("./logIn");

async function signUpLogin() {
  try {
    const { email, password, log } = await signUp();
    if (log.result == "SUCCESSFUL") {
      await logIn(email, password);
    }
  } catch (error) {
    // console.log(error);
  }
}

// signUpLogin();
module.exports = signUpLogin;
