"use strict";
const joi = require("joi");
const db = require("../../library/mongodb");
const moment = require("moment");
const tableName = "verificationCode";
const ObjectID = require("mongodb").ObjectID;
/**
 * @function
 * @name saveVerificationCode
 * @param {object} params - data coming from controller
 */
const saveVerificationCode = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .insert([
      {
        type: 2, // 1-mobile ,2- email
        verificationCode: "",
        generatedTime: parseInt(moment().valueOf() / 1000),
        expiryTime: parseInt(
          moment()
            .add(10, "m")
            .valueOf()
        ),
        triggeredBy: "Customer New Registration", // 2- forgot password ,1 - registration
        maxAttempt: 0,
        maxCount: 1,
        userId: params.id.toString(),
        userType: 1, // 1-customer, 2-driver
        givenInput: params.email,
        attempts: [],
        status: true,
        verified: false,
        isoDate: new Date()
      }
    ]);

  return result;
};
/**
 * @function
 * @name saveVerificationCodeMobile
 * @param {object} params - data coming from controller
 */
const saveVerificationCodeMobile = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .insert([
      {
        type: 1, // 1-mobile
        verificationCode: params.randomnumber,
        generatedTime: parseInt(moment().valueOf()),
        expiryTime: parseInt(
          moment()
            .add(params.otpExpiryTime, "s")
            .valueOf()
        ),
        triggeredBy: params.triggeredBy, // 2- forgot password ,1 - registration
        maxAttempt: 0,
        date: moment().format("DD-MMM-YY"),
        maxCount: 1,
        userId: "", // chek in last
        userType: params.userType, // 1-customer
        givenInput: params.givenInput,
        attempts: [],
        status: true,
        verified: false,
        isoDate: new Date()
      }
    ]);
  return result;
};
/**
 * @function
 * @name saveVerificationCodeForgotPassword
 * @param {object} params - data coming from controller
 */
const saveVerificationCodeForgotPassword = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .insert([
      {
        type: params.verifyType, // 1-mobile ,2- email
        verificationCode: params.randomnumber,
        generatedTime: parseInt(moment().valueOf()),
        expiryTime: parseInt(
          moment()
            .add(params.otpExpiryTime, "s")
            .valueOf()
        ),
        triggeredBy: params.triggeredBy, // 2- forgot password ,1 - registration
        maxAttempt: 0,
        date: moment().format("DD-MMM-YY"),
        maxCount: 1,
        userId: params.userId,
        userType: params.userType, // 1-customer, 2-driver
        givenInput: params.givenInput,
        attempts: [],
        status: true,
        verified: false,
        isoDate: new Date()
      }
    ]);

  return result;
};
/**
 * @function
 * @name count
 * @param {object} condition - data coming from controller
 */
const count = async condition => {
  const result = await db
    .get()
    .collection(tableName)
    .count({
      givenInput: condition.givenInput,
      userType: condition.userType,
      date: moment().format("DD-MMM-YY"),
      triggeredBy: condition.triggeredBy
    });
  return result;
};
/**
 * @function
 * @name count
 * @param {object} condition - data coming from controller
 */
const countForgotCount = async condition => {
  const result = await db
    .get()
    .collection(tableName)
    .count({
      givenInput: condition.givenInput,
      date: moment().format("DD-MMM-YY"),
      triggeredBy: condition.triggeredBy,
      userType: condition.userType
    });

  return result;
};
/**
 * @function
 * @name markStatusFalse
 * @param {object} condition - data coming from controller
 */
const markStatusFalse = async condition => {
  const result = await db
    .get()
    .collection(tableName)
    .findOneAndUpdate(
      {
        givenInput: condition.givenInput,
        triggeredBy: condition.triggeredBy,
        userType: condition.userType
      },
      { $set: { status: false } },
      { multi: true }
    );

  return result;
};
/**
 * @function
 * @name makeVerifyTrue
 * @param {object} params - data coming from controller
 */
const makeVerifyTrue = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOneAndUpdate(
      { _id: new ObjectID(params._id.toString()), status: true },
      {
        $set: { maxAttempt: params.maxAttempt + 1, verified: true },
        $push: {
          attempts: {
            enteredValue: params.code,
            verifiedOn: moment().valueOf(),
            isoDate: new Date(),
            success: true
          }
        }
      },
      { multi: true }
    );

  return result;
};
/**
 * @function
 * @name saveWrongEntered
 * @param {object} params - data coming from controller
 */
const saveWrongEntered = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOneAndUpdate(
      { _id: new ObjectID(params._id.toString()), status: true },
      {
        $set: { maxAttempt: params.maxAttempt + 1, verified: false },
        $push: {
          attempts: {
            enteredValue: params.code,
            verifiedOn: moment().valueOf(),
            isoDate: new Date(),
            success: false
          }
        }
      },
      { multi: true }
    );
  return result;
};
/**
 * @function
 * @name selectRecentCode
 * @param {object} params - data coming from controller
 */
const selectRecentCode = async params => {
  const res = await db
    .get()
    .collection(tableName)
    .find({
      givenInput: params.givenInput,
      userType: params.userType,
      status: true
    })
    .sort({ _id: -1 })
    .limit(1)
    .skip(0)
    .toArray((err, result) => {
      return result;
    });
};
/**
 * @function
 * @name selectRecentVerifiedCode
 * @param {object} params - data coming from controller
 */
const selectRecentVerifiedCode = async params => {
  const res = await db
    .get()
    .collection(tableName)
    .find({ givenInput: params.givenInput, userType: params.userType })
    .sort({ _id: -1 })
    .limit(1)
    .skip(0)
    .toArray((err, result) => {
      return result;
    });
};
/**
 * @function
 * @name isExists
 * @param {object} params - data coming from controller
 */
const isExists = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOne({
      _id: params._id
    });
  return result;
};
/**
 * @function
 * @name setLastToken
 * @param {object} params - data coming from controller
 */
const setLastToken = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOneAndUpdate(
      { _id: params._id },
      { $set: { lastToken: params.lastToken, verified: true, status: false } },
      {}
    );
  return result;
};
/**
 * @function
 * @name makePasswordTrue
 * @param {object} params - data coming from controller
 */
const makePasswordTrue = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .findOneAndUpdate({ _id: params._id }, { $set: { updatedPassword: true } });
  return result;
  Z;
};
module.exports = {
  saveVerificationCode,
  count,
  saveVerificationCodeMobile,
  markStatusFalse,
  selectRecentCode,
  selectRecentVerifiedCode,
  makeVerifyTrue,
  saveWrongEntered,
  countForgotCount,
  saveVerificationCodeForgotPassword,
  isExists,
  setLastToken,
  makePasswordTrue
};
