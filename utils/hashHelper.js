// import { Buffer } from "buffer";
// import CryptoJS from "crypto-js";
const { Buffer } = require("buffer");
const CryptoJS = require("crypto-js");

// import { HOOK_SECRET_KEY } from "../configs/env-vars";
// const HOOK_SECRET_KEY = "DiGiSecrect@key2023";
const HOOK_SECRET_KEY = process.env.REACT_APP_HOOK_SECRET_KEY;
const codeData = (data) => {
  // const encryptedText = Buffer.from(HOOK_SECRET_KEY, 'hex').toString();
  // const decryptedText = customDecrypt(encryptedText);
  let hashData = JSON.stringify(data);
  hashData = CryptoJS.AES.encrypt(hashData, HOOK_SECRET_KEY).toString();
  hashData = Buffer.from(hashData).toString("hex");
  return hashData;
};
const decodeData = (data, path) => {
  // const encryptedText = Buffer.from(HOOK_SECRET_KEY, 'hex').toString();
  // const decryptedText = customDecrypt(encryptedText);
  try {
    let tmpData = Buffer.from(data, "hex").toString();
    tmpData = CryptoJS.AES.decrypt(tmpData, HOOK_SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
    return JSON.parse(tmpData);
  } catch (error) {
    console.error("decode data", path, error);
  }
  return "";
};
module.exports = { codeData, decodeData };
// const encrypt = (text, key) => {
//   let encryptedText = '';
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < text.length; i++) {
//     const charCode = text.charCodeAt(i);
//     const keyChar = key.charCodeAt(i % key.length);
//     // eslint-disable-next-line no-bitwise
//     const encryptedCharCode = charCode ^ keyChar;
//     encryptedText += String.fromCharCode(encryptedCharCode);
//   }
//   return encryptedText;
// };

// export const customDecrypt = encryptedText => {
//   return 'DiGiSecrect@key2023';
// };
