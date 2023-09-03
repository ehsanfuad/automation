require("dotenv").config();

// signup and login customer
const customerFullAuth = require("./routes/Auth/Customer/signUpLogIn");

// signup and login lawyer
const lawyerFullAuth = require("./routes/Auth/Lawyer/signUpLogIn");

// signup login partner
const partnerFullAuth = require("./routes/Auth/Partner/signUpLogin");

//signup login firm
const firmFullAuth = require("./routes/Auth/Firm/signUpLogin");

//sign in Firm's Lawyer
const signInFirmsLawyer = require("./routes/Auth/Firm's Lawyer/testLogIn");

//sign in partner's Lawyer
const signInPartnersLawyer = require("./routes/Auth/Partner's Lawyer/testLogIn");

// forgot password
const forgotPassword = require("./routes/Auth/ForgotPassword/forgotPassword");

// buy a wills case as guest
// require("./routes/cases/guest/wills");
//personal injury
require("./routes/cases/guest/personalInjury");

async function runAutomation() {
  // await customerFullAuth();
  // await lawyerFullAuth();
  await partnerFullAuth();
  // await firmFullAuth();
  // await signInFirmsLawyer();
  // await signInPartnersLawyer();
  // await forgotPassword("qa-7c4715d0@mailinator.com");
}
// runAutomation();
