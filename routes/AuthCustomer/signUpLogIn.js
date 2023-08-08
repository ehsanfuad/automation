const signUp = require("./signUp");
const logIn = require("./logIn");
const uuid = require("uuid");

async function signUpLogin() {
  // const signUpEmail = "qauser2026@mailinator.com";
  let id = uuid.v1();
  id = id.substring(0, id.indexOf("-"));
  const signUpEmail = `qa-${id}@mailinator.com`;
  const signUpPassword = "P@ssword1";
  try {
    const { email, password, result } = await signUp(
      signUpEmail,
      signUpPassword
    );
    // if (result == "SUCCESSFUL") {
    //   await logIn(email, password);
    // }
  } catch (error) {
    // console.log(error);
  }
}

signUpLogin();
