const BaseJoi = require("@hapi/joi");
const Extension = require("@hapi/joi-date");
const joi = BaseJoi.extend(Extension);
joi.objectId = require("joi-objectid")(joi);
const user = require("../../../../../models/user");
const Boom = require("boom");
const objectId = require("mongodb").ObjectID;

const payload = joi
  .object({
    name: joi
      .string()
      .default("abc")
      .required()
      .description("put new name here"),
    dob: joi
      .date()
      .utc()
      .format(["YYYY/MM/DD", "DD-MM-YYYY"])
      .default("01-01-2000")
      .description("Enter Birth date here")
  })
  .required();

const handler = async (req, h) => {
  newdata = {
    name: req.payload.name,
    dob: req.payload.dob
  };
  const { id } = h.request.auth.credentials;
  const condition = { _id: objectId(id) };
  try {
    const result = await user.update(condition, { $set: newdata });

    if (result.result.n > 0)
      return h.response({ message: "successfully updated" });
    return Boom.badRequest("some went wrong..");
  } catch (error) {
    return Boom.badImplementation(error);
  }

  // return new Promise((resolve, reject) => {
  //   user
  //     .findOne(condition)
  //     .then(userData => {
  //       if (!userData)
  //         return resolve(Boom.badRequest("Email or Password invalid"));
  //       bcrypt.compare(req.payload.password, userData.password, function(
  //         err,
  //         res
  //       ) {
  //         if (res) {
  //           user
  //             .findOneAndUpdate(condition, { $set: newdata })
  //             .then(clientData => {
  //               if (clientData.lastErrorObject.n != 0)
  //                 return resolve({ message: "successfully updated" });
  //               return resolve(
  //                 Boom.badRequest(
  //                   "Some thing went wrong check your email and password.."
  //                 )
  //               );
  //             });
  //         } else {
  //           return resolve(Boom.badRequest("wrong email id and password"));
  //         }
  //       });
  //     })
  //     .catch(err => {
  //       reject(Boom.badImplementation(err));
  //     });
  // });
};

module.exports = { payload, handler };
