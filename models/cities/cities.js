"use strict";
const joi = require("joi");
const moment = require("moment");
const ObjectID = require("mongodb").ObjectID;

const db = require("../../library/mongodb");

const tableName = "cities";

/**
 * find zone of current location
 * @param {*} params
 */
const inZone = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOne(
      {
        polygons: {
          $geoIntersects: {
            $geometry: { type: "Point", coordinates: [params.lat, params.long] }
          }
        }
      },
      { _id: 0, "cities.$": 1 }
    );
  return result;
};

module.exports = { inZone };
