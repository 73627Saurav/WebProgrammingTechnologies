const auth = require("autheticate.js");
console.log(auth.validate("user1", "pass1"))
console.log(auth.validate("user1", "pass3"))