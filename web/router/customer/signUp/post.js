const ObjectID = require("mongodb").ObjectID;
var geoip = require("geoip-lite");

const customer = require("../../../../models/customer");
const zendesk = require("../../../../models/zendesk");

module.exports = async (req, h) => {
  req.payload.zendeskId = "";
  let mongoId = new ObjectID();
  let fcmTopic = "FCM-" + mongoId.toString() + moment().unix(); //generate a new fcmTopic on new login
  let mqttTopic = "MQTT-" + mongoId.toString() + moment().unix(); //generate a new mqttTopic on new login
  req.payload.coordinates = {
    longitude: parseFloat(req.payload.longitude || 0.0),
    latitude: parseFloat(req.payload.latitude || 0.0)
  };
  req.payload.fcmTopic = fcmTopic;
  req.payload.mqttTopic = mqttTopic;

  var url = zendesk.config.zd_api_url + "/users.json";
  var dataArr = {
    user: { name: req.payload.name, email: req.payload.email, role: "end-user" }
  };

  try {
    //check if the email is already registered
    let count = await customer.count({
      email: req.payload.email,
      status: { $nin: [4, "4"] },
      userType: { $nin: [4] }
    });
    if (count > 0)
      h.response({ message: req.i18n.__("postSignUp")["412"] }).code(412);

    //create user at zendesk and generate id
    const result = await zendesk.users.post(dataArr, url);
    req.payload.zendeskId = result.user ? result.user.id : "";

    //check if the phone is already registered
    count = await customer.count({
      email: req.payload.email,
      status: { $nin: [4, "4"] },
      userType: { $nin: [4] }
    });
    if (count > 0)
      h.response({ message: req.i18n.__("postSignUp")["413"] }).code(413);

    let geoCalcIp = geoip.lookup(req.payload.ipAddress);
    req.payload.registeredFromCity = geoCalcIp ? geoCalcIp.city : "";
    req.payload.ip = {
      address: req.payload.ipAddress ? req.payload.ipAddress : "",
      city: geoCalcIp ? geoCalcIp.city : ""
    };
    req.payload.cityId = "";
  } catch (error) {
    return h.response({ error: error }).code(400);
  }
};
