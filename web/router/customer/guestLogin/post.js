const customer = require("../../../../models/customer");
const gen=require('../../../middleware/generate')
module.exports = async (req, h) => {
  try {

    const result =await customer.updateLatLong(req.payload)
    let id;
    if (result.lastErrorObject.updatedExisting) id = result.value._id.toString();
    else id = result.lastErrorObject.upserted.toString();

    //let authToken=gen.genToken()
  } catch (error) {
    return h
      .response({ message: req.i18n.__("genericErrMsg")["500"] })
      .code(500);
  }
  return h.response({ message: "done" });
};
