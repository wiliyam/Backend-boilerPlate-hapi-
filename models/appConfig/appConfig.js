"use strict";
const joi = require("joi");
const db = require("../../library/mongodb");
const moment = require("moment");
const tableName = "appConfig";
const ObjectID = require("mongodb").ObjectID;

/**
 * @function
 * @name get
 * @param {object} params - data coming from controller
 */
const get = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOne({});

  return result;
};
/**
 * @function
 * @name getAppConfigration
 * @param {object} params - data coming from controller
 */
const getAppConfigration = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOne({});

  return result;
};

/**
 *
 * @param {*} params
 */
const getOne = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOne({});

  return result;
};

/**
 *
 * @param {*} condition
 * @param {*} data
 */
const updateRotationKey = async (condition, data) => {
  const result = await db
    .get()
    .collection(tableName)
    .findOneAndUpdate(condition, data, { returnOriginal: false });

  return result;
};

/**
 *
 * @param {*} condition
 * @param {*} data
 */
const fineAndUpdate = async (condition, data) => {
  const result = await db
    .get()
    .collection(tableName)
    .update(condition, { $set: data });

  return result;
};
module.exports = {
  get,
  getAppConfigration,
  getOne,
  updateRotationKey,
  fineAndUpdate
};
