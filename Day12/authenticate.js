obj = { "user1": "pass1", "user2": "pass2", "user3": "pass3" }

exports.validate = function(uname, pass) {
  var p = ob[uname]
  if (p === pass) {
    return true;
  }
  return false;
}