const logIn = require("../logIn");

async function testLogIn() {
  try {
    await logIn(
      "lawyer2004@mailinator.com",
      process.env.PASSWORD,
      "Sign in Partner's Lawyer"
    );
  } catch (error) {
    const log = {
      TestTitle: "signInPartnersLawyer",
      result: "FAILED",
      error: "error",
    };
    writeObjectToCsv("log.csv", log);
  }
}

// testLogIn();
module.exports = testLogIn;
