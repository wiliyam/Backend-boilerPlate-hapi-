const user = require("../../models/user");
const { ObjectID } = require("mongodb");

const validate = async function(decoded, req) {
  //id = new ObjectID(decoded.id);
  const { id, email, isAdmin } = decoded;
  // console.log("i am Validate running.............................", decoded);

  try {
    userData = await user.findOne({ email: email });
    if (userData) {
      return {
        isValid: true,
        credentials: { id, isAdmin }
      };
    } else {
      return { isValid: false };
    }
  } catch (error) {
    return { isValid: false };
  }
};

module.exports = validate;
