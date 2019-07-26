const moment = require("moment");
const ObjectID = require("mongodb").ObjectID;
const Timestamp = require("mongodb").Timestamp;

const db = require("../../library/mongodb");

const tableName = "customer";

const count = async (condition, callback) => {
  db.get()
    .collection(tableName)
    .count(condition, (err, result) => {
      return callback(err, result);
    });

  const result = await db
    .get()
    .collection(tableName)
    .count(condition);
  return result;
};

module.exports = { count };
