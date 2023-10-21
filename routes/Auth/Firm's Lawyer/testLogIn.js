const logIn = require("../logIn");

async function testLogIn() {
  try {
    await logIn(
      "firm@mailinator.com",
      process.env.PASSWORD,
      "Sign in Firm's Lawyer"
    );
  } catch (error) {}
}

// testLogIn();
module.exports = testLogIn;
