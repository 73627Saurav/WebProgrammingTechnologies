const auth = require("./authenticate");
console.log(auth.validate("user1", "pass1"))
console.log(auth.validate("user1", "pass3"))