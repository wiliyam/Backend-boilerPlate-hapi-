const getDetails = require("./getDetails");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");
const uploadImage = require("./uploadImage");

module.exports = [].concat(getDetails, updateUser, deleteUser, uploadImage);
