const logIn = require("./logIn");

async function testLogIn() {
  try {
    await logIn("lawyer2004@mailinator.com", process.env.PASSWORD);
  } catch (error) {
    console.log(error);
  }
}

// testLogIn();
module.exports = testLogIn;
