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
const updateLatLong = (params) => {
  const result =await db.get().collection(tableName)
      .findOneAndUpdate(
          { 'mobileDevices.deviceId': params.deviceId, "guestToken": false, "userType": 3 },
          {
              "$set": {
                  status: 2, //   0 - Active , 1 - Banned , 2 - Unverfied 
                  createdDate: moment().unix(),
                  coordinates: {
                      longitude: parseFloat(params.longitude || 0.0),
                      latitude: parseFloat(params.latitude || 0.0)
                  },
              }
          },
          { upsert: true })

  return result
}

module.exports = { count, isExistsWithIdType,updateLatLong };
