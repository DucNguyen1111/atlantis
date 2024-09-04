var CryptoJS = require("crypto-js");
var payload = null
console.log("Using payload as " + payload)
var hash = CryptoJS.HmacSHA1(payload, 'baz').toString(CryptoJS.enc.Hex)
console.log(hash)