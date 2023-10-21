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
const willsAsGuest = require("./routes/cases/guest/wills");

// buy a personal injury case as guest
const personalInjuryAsGuest = require("./routes/cases/guest/personalInjury");

// buy a real state case as guest
const realEstateAsGuest = require("./routes/cases/guest/realState");

// customer case wills
const willsAsCustomer = require("./routes/cases/customer/wills");
// customer case real state
const realEstateAsCustomer = require("./routes/cases/customer/realState");
// custore case personal injury
const personalInjuryAsCustomer = require("./routes/cases/customer/personalInjury");

//get a qoute
const getQoute = require("./routes/qoute/getQoute");

//customer case preview
const customerCasePreview = require("./routes/cases/customer/casePreview");

// mailer
const sendEmail = require("./utils/mailer");
const { writeObjectToCsv } = require("./utils/utils");
async function runAutomation() {
  // try {
  //   await getQoute();
  // } catch (error) {
  //   console.log("get a qoute", error);
  // }
  try {
    await customerCasePreview();
  } catch (error) {
    console.log("customerCasePreview", error);
  }
  // try {
  //   await customerFullAuth();
  // } catch (error) {
  //   console.error("Error in customerFullAuth:", error);
  // }
  // try {
  //   await partnerFullAuth();
  // } catch (error) {
  //   console.error("Error in partnerFullAuth:", error);
  // }
  // try {
  //   await firmFullAuth();
  // } catch (error) {
  //   console.error("Error in firmFullAuth:", error);
  // }
  // try {
  //   await signInFirmsLawyer();
  // } catch (error) {
  //   const log = {
  //     TestTile: "signInFirmsLawyer",
  //     result: "FAILED",
  //     error: "error",
  //   };
  //   writeObjectToCsv("log.csv", log);
  //   console.error("Error in signInFirmsLawyer:", error);
  // }
  // try {
  //   await signInPartnersLawyer();
  // } catch (error) {
  //   console.error("Error in signInPartnersLawyer:", error);
  // }
  // try {
  //   await forgotPassword("qa-7c4715d0@mailinator.com");
  // } catch (error) {
  //   const log = {
  //     TestTitle: "forgotPassword",
  //     result: "FAILED",
  //     error: error,
  //   };
  //   writeObjectToCsv("log.csv", log);
  // }
  // try {
  //   await willsAsGuest();
  // } catch (error) {
  //   const log = {
  //     TestTitle: "willsAsGuest",
  //     result: "FAILED",
  //     error: "error",
  //   };
  //   writeObjectToCsv("log.csv", log);
  //   console.error("Error in willsAsGuest:", error);
  // }
  // try {
  //   await realEstateAsGuest();
  // } catch (error) {
  //   const log = {
  //     TestTitle: "realEstateAsGuest",
  //     result: "FAILED",
  //     error: "error",
  //   };
  //   writeObjectToCsv("log.csv", log);
  //   console.error("Error in realEstateAsGuest:", error);
  // }
  // try {
  //   await personalInjuryAsGuest();
  // } catch (error) {
  //   const log = {
  //     TestTitle: "personalInjuryAsGuest",
  //     result: "FAILED",
  //     error: "error",
  //   };
  //   writeObjectToCsv("log.csv", log);
  //   console.error("Error in personalInjuryAsGuest:", error);
  // }
  // try {
  //   await willsAsCustomer();
  // } catch (error) {
  //   const log = {
  //     TestTitle: "willsAsCustomer",
  //     result: "FAILED",
  //     error: "error",
  //   };
  //   writeObjectToCsv("log.csv", log);
  //   console.error("Error in willsAsCustomer:", error);
  // }
  // try {
  //   await realEstateAsCustomer();
  // } catch (error) {
  //   const log = {
  //     TestTitle: "realEstateAsCustomer",
  //     result: "FAILED",
  //     error: "error",
  //   };
  //   writeObjectToCsv("log.csv", log);
  //   console.error("Error in realEstateAsCustomer:", error);
  // }
  // try {
  //   await personalInjuryAsCustomer();
  // } catch (error) {
  //   const log = {
  //     TestTitle: "personalInjuryAsCustomer",
  //     result: "FAILED",
  //     error: "error",
  //   };
  //   writeObjectToCsv("log.csv", log);
  //   console.error("Error in personalInjuryAsCustomer:", error);
  // }
  // try {
  //   await sendEmail();
  // } catch (error) {
  //   console.error("Error in sendEmail:", error);
  // }
}

runAutomation();
