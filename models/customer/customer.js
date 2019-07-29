const moment = require("moment");
const ObjectID = require("mongodb").ObjectID;
const Timestamp = require("mongodb").Timestamp;

const db = require("../../library/mongodb");

const tableName = "customer";

/**
 * Count available customer base oon condition
 * @param {*} condition
 */
const count = async condition => {
  const result = await db
    .get()
    .collection(tableName)
    .count(condition);
  return result;
};

/**
 * check user with id
 * @param {*} params
 */
const isExistsWithIdType = async params => {
  db.get().collection(tableName);

  const result = await db
    .get()
    .collection(tableName)
    .findOne({
      _id: params._id,
      userType: 3,
      guestToken: false
    });

  return result;
};

/**
 * for update latitude and longitude of customer
 * @param {*} params
 */
const updateLatLong = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOneAndUpdate(
      {
        "mobileDevices.deviceId": params.deviceId,
        guestToken: false,
        userType: 3
      },
      {
        $set: {
          status: 2, //   0 - Active , 1 - Banned , 2 - Unverfied
          createdDate: moment().unix(),
          coordinates: {
            longitude: parseFloat(params.longitude || 0.0),
            latitude: parseFloat(params.latitude || 0.0)
          }
        }
      },
      { upsert: true }
    );

  return result;
};

/**
 * use for save details of customers
 * @function
 * @name saveDetails
 * @param {object} params - data coming from controller
 */

const saveDetails = async params => {
  if (params.userType == 3) {
    const result = await db
      .get()
      .collection(tableName)
      .findOneAndUpdate(
        { _id: new ObjectID(params.id) },
        {
          $set: {
            name: params.name ? params.name : "",
            email: params.email ? params.email : "",
            customerPOSId: params.customerPOSId ? params.customerPOSId : "",
            password: params.password, //hash the password and store in db
            phone: params.mobile ? params.mobile : "",
            countryCode: params.countryCode,
            zipCode: params.zipCode || "",
            dateOfBirth: params.dateOfBirth
              ? new Date(params.dateOfBirth).getTime() / 1000
              : "",
            status: 2,
            statusMsg: "active",
            userType: 1,
            userTypeMsg: "Customer",
            coordinates: {
              longitude: parseFloat(params.longitude || 0.0),
              latitude: parseFloat(params.latitude || 0.0)
            },
            socialMediaId: params.socialMediaId ? params.socialMediaId : "",
            loginType: params.loginType ? params.loginType : "",
            profilePic: params.profilePic || "",
            termsAndCondition: params.termsAndCond,
            //referralCode: params.referralCode,
            referralCode: params.referralCode,
            userReferalCode: params.userReferalCode,
            createdDate: new Date().getTime() / 1000,
            createdTimestamp: new Timestamp(1, moment().unix()),
            createdISOdate: new Date(),
            identityCard: {
              url: params.identityCard ? params.identityCard : "",
              verified: false
            },
            mmjCard: {
              url: params.mmjCard ? params.mmjCard : "",
              verified: false
            },
            mqttTopic: params.mqttTopic,
            fcmTopic: params.fcmTopic,
            mobileVerified: true,
            emailVerified: false,
            zendeskId: params.zendeskId,
            ip: params.ip
              ? params.ip
              : {
                  address: "",
                  city: ""
                },
            wallet: {
              balance: 0,
              blocked: 0,
              hardLimit: 0,
              softLimit: 0,
              softLimitHit: false,
              hardLimitHit: false
            },
            registeredFromCity: params.registeredFromCity
              ? params.registeredFromCity
              : "",
            cityId: params.cityId ? params.cityId : "",
            guestToken: true
          },
          $push: {
            actions: {
              createdBy: "Customer",
              //storeId: params.storeId ? params.storeId : "",
              createdTimeStamp: new Date().getTime() / 1000,
              createdISOdate: new Date()
            }
          }
        },
        { upsert: true }
      );

    return result;
  } else {
    let data = {
      name: params.name ? params.name : "",
      email: params.email ? params.email : "",
      customerPOSId: params.customerPOSId ? params.customerPOSId : "",
      password: params.password, //hash the password and store in db
      phone: params.mobile ? params.mobile : "",
      countryCode: params.countryCode,
      userType: 1,
      userTypeMsg: "Customer",
      zipCode: params.zipCode || "",
      dateOfBirth: params.dateOfBirth
        ? new Date(params.dateOfBirth).getTime() / 1000
        : "",
      status: 2,
      statusMsg: "Active",
      coordinates: {
        longitude: parseFloat(params.longitude || 0.0),
        latitude: parseFloat(params.latitude || 0.0)
      },
      socialMediaId: params.socialMediaId ? params.socialMediaId : "",
      loginType: params.loginType ? params.loginType : "",
      profilePic: params.profilePic || "",
      zendeskId: params.zendeskId,
      termsAndCondition: params.termsAndCond,
      referralCode: params.referralCode,
      userReferalCode: params.userReferalCode,
      createdDate: new Date().getTime() / 1000,
      createdTimestamp: new Timestamp(1, moment().unix()),
      createdISOdate: new Date(),
      identityCard: { url: params.identityCard, verified: false },
      mmjCard: { url: params.mmjCard, verified: false },
      mqttTopic: params.mqttTopic,
      fcmTopic: params.fcmTopic,
      mobileVerified: true,
      emailVerified: false,
      ip: params.ip
        ? params.ip
        : {
            address: "",
            city: ""
          },
      registeredFromCity: params.registeredFromCity
        ? params.registeredFromCity
        : "",
      cityId: params.cityId ? params.cityId : "",
      wallet: {
        balance: 0,
        blocked: 0,
        hardLimit: 0,
        softLimit: 0,
        softLimitHit: false,
        hardLimitHit: false
      },
      guestToken: true
    };
    const result = await db
      .get()
      .collection(tableName)
      .findOneAndUpdate(
        {
          email: params.email,
          countryCode: params.countryCode,
          phone: params.mobile
        },
        {
          $set: data,
          $push: {
            actions: {
              createdBy: "Customer",
              //storeId: params.storeId ? params.storeId : "",
              createdTimeStamp: new Date().getTime() / 1000,
              createdISOdate: new Date()
            }
          }
        },
        { upsert: true, returnOriginal: false }
      );
    return result;
  }
};

/**
 * @function
 * @name updateDeviceLog
 * @param {object} params - data coming from controller
 */
const updateDeviceLog = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOneAndUpdate(
      { _id: new ObjectID(params.id) },
      {
        $set: {
          userType: params.userType,
          userTypeMsg: "Guest",
          guestToken: false,
          fcmTopic: params.fcmTopic,
          // guestToken: (params.userType == 3)?false:true,
          userTypeMsg: params.userTypeMsg,
          "mobileDevices.deviceId": params.deviceId,
          "mobileDevices.deviceOsVersion": params.deviceOsVersion,
          "mobileDevices.appVersion": params.appVersion,
          "mobileDevices.deviceType": parseInt(params.deviceType),
          "mobileDevices.deviceTypeMsg":
            parseInt(params.deviceType) == 1 ? "Ios" : "Android",
          "mobileDevices.pushToken": params.pushToken ? params.pushToken : "",
          "mobileDevices.lastLogin": moment().unix(),
          "mobileDevices.lastTimestamp": new Timestamp(1, moment().unix()),
          "mobileDevices.lastISOdate": new Date(),
          "mobileDevices.currentlyActive": true
        }
      },
      { upsert: true }
    );
  return result;
};

module.exports = {
  count,
  isExistsWithIdType,
  updateLatLong,
  saveDetails,
  updateDeviceLog
};
