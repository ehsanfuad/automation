const logIn = require("./logIn");

async function testLogIn() {
  try {
    await logIn("firm@mailinator.com", process.env.PASSWORD);
  } catch (error) {
    console.log(error);
  }
}

// testLogIn();
module.exports = testLogIn;
