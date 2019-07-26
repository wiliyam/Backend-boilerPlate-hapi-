const signUp = require("./signUp");
const guestLogin = require("./guestLogin");

module.exports = [].concat(guestLogin, signUp);
