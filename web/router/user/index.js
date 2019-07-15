const post = require("./post");
const patch = require("./patch");
const get = require("./get");
const logout = require("./logout");
const del = require("./delete");
const genAccessToken = require("./genAccessToken");

module.exports = { post, patch, get, del, genAccessToken, logout };
