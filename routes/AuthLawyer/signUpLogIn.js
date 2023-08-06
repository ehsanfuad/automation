const signUp = require("./signUp");
const logIn = require("./logIn");
async function signUpLogin() {
  const signUpEmail = "qauser2016@mailinator.com";
  const signUpPassword = "P@ssword1";
  try {
    const { email, password, result } = await signUp(
      signUpEmail,
      signUpPassword
    );
    if (result == "SUCCESSFUL") {
      await logIn(email, password);
    }
  } catch (error) {
    console.log(error);
  }
}

signUpLogin();
