"use strict";
const joi = require("joi");
const moment = require("moment");
const ObjectID = require("mongodb").ObjectID;

const db = require("../../library/mongodb");

const tableName = "cities";

const inZone = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOne(
      {
        "cities.polygons": {
          $geoIntersects: {
            $geometry: { type: "Point", coordinates: [params.long, params.lat] }
          }
        }
      },
      { _id: 0, "cities.$": 1 }
    );
  return result;
};

module.exports = { inZone };
