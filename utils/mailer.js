const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { getColumnFromCsv, getCellValueByColumn } = require("./utils");

async function sendEmail() {
  const filePath = "log.csv";
  const columnName = "error";
  const columnData = await getColumnFromCsv(filePath, columnName);
  let tests = columnData.length;
  let FAILED = 0;
  let success = 0;
  let failedScenarios = "";
  await Promise.all(
    columnData.map(async (item, index) => {
      if (item === "") {
        success = success + 1;
      }
      if (item === "error") {
        FAILED = FAILED + 1;
        let name = await getCellValueByColumn("log.csv", index, "TestTite");
        failedScenarios = failedScenarios + "-" + name;
      }
    })
  );
  const text = `Lawvo Automatic tests have been done with the following information:\n
  1- number of Tests: ${tests}\n
  2- Failed: ${FAILED}\n
  3- Success: ${success}\n
  4- Failed Scenarios: ${failedScenarios}`;
  const smtpConfig = {
    service: "Gmail", // Use the email service you prefer (e.g., 'Gmail', 'SMTP', etc.)
    auth: {
      user: "lawvoautomation@gmail.com",
      pass: process.env.APP_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    from: "lawvoautomation@gmail.com",
    to: process.env.EMAIL,
    subject: "Lawvo Automatic tests",
    text: text,
    attachments: [
      {
        filename: "log.csv",
        content: fs.createReadStream(path.join(__dirname, "../log.csv")),
      },
    ],
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  let objectDate = new Date();
  var date =
    objectDate.getFullYear() +
    "-" +
    (objectDate.getMonth() + 1) +
    "-" +
    objectDate.getDate();
  var time =
    objectDate.getHours() +
    ":" +
    objectDate.getMinutes() +
    ":" +
    objectDate.getSeconds();
  const newFileName = date + "-" + time + "-" + filePath;
  fs.rename(filePath, newFileName, (err) => {
    if (err) {
      console.error(`Error renaming file: ${err}`);
    } else {
      console.log("File renamed successfully!");
    }
  });
}
module.exports = sendEmail;
