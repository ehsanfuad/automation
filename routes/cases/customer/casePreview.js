const { setupWebDriver } = require("../../../utils/utils");
const willsAsCustomer = require("./wills");
async function casePreview() {
  let code = 0;
  try {
    code = await willsAsCustomer();
  } catch (error) {
    console.log(error);
  }
  const driver = await setupWebDriver();
  try {
    if (code != 0) {
      
    }
  } finally {
    // await driver.quit();
  }
}
module.exports = casePreview;
