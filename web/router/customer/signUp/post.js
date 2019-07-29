const ObjectID = require("mongodb").ObjectID;
var geoip = require("geoip-lite");

const verificationCode = require("../../../../models/verificationCode");
const customer = require("../../../../models/customer");
const mobileDevices = require("../../../../models/mobileDevices");
const zendesk = require("../../../../models/zendesk");
const gen = require("../../../middleware/generate");

const signUphandler = async (req, h) => {
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
    let result = await zendesk.users.post(dataArr, url);
    req.payload.zendeskId = result.user ? result.user.id : "";

    //check if the phone is already registered
    count = await customer.count({
      countryCode: req.payload.countryCode,
      phone: req.payload.mobile,
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

    //find zone from where customer login
    req.payload.cityId = "";
    const zone = await cities.inZone({
      lat: req.payload.latitude || 0,
      long: req.payload.longitude || 0
    });
    req.payload.cityId = zone ? zone.cityId : "";
    req.payload.registeredFromCity = zone ? zone.cityName : "";

    req.payload.id = req.auth.credentials._id;
    req.payload.userReferalCode = req.payload.referralCode
      ? req.payload.referralCode
      : "";
    req.payload.referralCode = "";

    req.payload.password = await gen.genHash(req.payload.password);
    req.payload.userType = 1; //type 1 for insert new user

    const isExist = await customer.isExistsWithIdType({
      _id: new ObjectID(req.auth.credentials._id)
    });

    if (isExist) {
      req.payload.userType = 3;
      let result = customer.saveDetails(req.payload);
      let id = req.auth.credentials
        ? req.auth.credentials._id.toString()
        : result.value._id;
      req.payload.newUserId = id;
      updateLogs(id, 1, req.payload); //asynchronously update the login status
    } //type 3 for update user
    else {
      req.payload.userType = 1; //user type 1 for insert
      customer.saveDetails(req.payload, (err, result) => {
        let result = customer.saveDetails(req.payload);
        let id = result.value._id.toString();
        req.payload.newUserId = id;

        updateLogs(id, 1, req.payload); //asynchronously update the login status
      });
    }

    let result = await verificationCode.saveVerificationCode({
      id: req.auth.credentials._id.toString(),
      email: req.payload.email
    });
  } catch (error) {
    return h.response({ error: error }).code(500);
  }
};

/**
 * @function
 * @name updateLogs
 * @param {string} id - customer id.
 * @param {string} userType - customer or guest
 * @param {object} data - data coming from req.payload
 */

const updateLogs = async (id, userType, data) => {
  data.id = id;
  data.userType = userType;
  data.userTypeMsg = "Customer";
  try {
    let result = await mobileDevices.updateMobileDevices(data);

    let devicelog = await customer.updateDeviceLog(data);
  } catch (error) {
    return h.response({ error: error }).code(500);
  }
};

module.exports = signUphandler;
