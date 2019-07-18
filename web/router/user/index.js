const signOut = require("./signOut");
const signIn = require("./signIn");
const signUp = require("./signUp");
const profile = require("./profile");
const utility = require("./utility");

module.exports = [].concat(signIn, signUp, signOut, profile, utility);
