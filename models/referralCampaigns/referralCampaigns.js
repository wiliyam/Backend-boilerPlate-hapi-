"use strict";
const joi = require("joi");
const db = require("../../library/mongodb");
const moment = require("moment");
const tableName = "referralCampaigns";
const ObjectID = require("mongodb").ObjectID;

/**
 * @function
 * @name post a new campaign to promoCampaigns collection
 * @param {object} params - data coming from controller
 */
const postReferralCampaign = async refferalData => {
  const result = await db
    .get()
    .collection(tableName)
    .insert(refferalData);
  return result;
};

const validateReferral = async requestData => {
  var citiIds = requestData.cityId;
  var zoneIds = requestData.cityId;
  // var vechileType = requestData.vehicleType;
  const res = await db
    .get()
    .collection(tableName)
    .aggregate([
      {
        $match: {
          "cities.cityId": {
            $in: [citiIds]
          },
          // "zones":{
          //         $in: [citiIds]
          // },
          status: 2,
          promoType: "referralCampaign"
        }
      },
      {
        $project: {
          _id: 1,
          title: 1,
          promoType: 1,
          status: 1,
          cities: 1,
          zones: 1,
          description: 1,
          termsConditions: 1,
          rewardTriggerType: 1,
          startTime: 1,
          endTime: 1,
          referrerDiscount: 1,
          newUserDiscount: 1,
          perUserLimit: 1,
          rewardTriggerType: 1,
          tripCount: 1,
          codesGenerated: 1,
          newUserBillingAmtTrigger: 1,
          howITWorks: 1,
          referrerMLM: 1,
          mlmStatus: 1
        }
      }
    ])
    .toArray((err, result) => {
      return result;
    });
};
const updateReferralsStatus = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .updateMany(
      {
        _id: {
          $in: params.campaignIds
        }
      },
      {
        $set: {
          status: params.status
        }
      },
      {
        returnOriginal: false
      }
    );

  return result;
};

const getAllCampaignsByStatus = async requestData => {
  var condition = {
    status: requestData.status
  };
  if (typeof requestData.sSearch !== "undefined" && requestData.sSearch != "") {
    var regexValue = new RegExp("^" + requestData.sSearch, "i");

    condition["$or"] = [
      {
        title: regexValue
      },
      {
        code: regexValue
      },
      {
        "cities.cityName": regexValue
      }
    ];
  }

  if (typeof requestData.cityId !== "undefined" && requestData.cityId != "") {
    condition["cities.cityId"] = requestData.cityId;
  }

  if (
    typeof requestData.dateTime !== "undefined" &&
    requestData.dateTime !== ""
  ) {
    var dateTime = requestData.dateTime;
    var dateTimeString = dateTime.split("-", 2);
    var startDate = dateTimeString[0];
    var endDate = dateTimeString[1];
    var startDateISO = new Date(startDate).toISOString();
    var endDateISO = new Date(endDate).toISOString();

    condition["startTime"] = {};

    condition["endTime"] = {};
  }

  const res = await db
    .get()
    .collection(tableName)
    .find(condition)
    .skip(requestData.offset)
    .limit(requestData.limit)
    .toArray((err, result) => {
      return result;
    });
};

// Update codes count
const increaseCodeGeneratedCount = async promoId => {
  const result = await db
    .get()
    .collection(tableName)
    .update(
      {
        _id: new ObjectID(promoId)
      },
      {
        $inc: {
          codesGenerated: 1
        }
      }
    );

  return result;
};

/*
Increase claim count data
 */
const increaseClaimCount = async promoId => {
  const result = await db
    .get()
    .collection(tableName)
    .update(
      {
        _id: new ObjectID(promoId)
      },
      {
        $inc: {
          totalClaims: 1
        }
      }
    );
  return result;
};

const getCountByStatus = async status => {
  const result = await db
    .get()
    .collection(tableName)
    .count({ status: status });

  return result;
};

const getCampaignById = async campaignId => {
  const res = await db
    .get()
    .collection(tableName)
    .find({
      _id: new ObjectID(campaignId)
    })
    .toArray((err, result) => {
      return result;
    });
};

/*
Increase qualifiedTripLogs
 */
const increaseQualifiedTripCount = async promoId => {
  const result = await db
    .get()
    .collection(tableName)
    .update(
      {
        _id: new ObjectID(promoId)
      },
      {
        $inc: {
          qualifyingTrips: 1
        }
      }
    );

  return result;
};

/*
Increase qualifiedTripLogs
 */
const increaseUnlockedCodeCount = async promoId => {
  const result = await db
    .get()
    .collection(tableName)
    .update(
      {
        _id: new ObjectID(promoId)
      },
      {
        $inc: {
          unlockedCount: 1
        }
      }
    );
  return result;
};

const updateReferral = async params => {
  const result = await db
    .get()
    .collection(tableName)
    .updateOne(
      {
        _id: new ObjectID(params.referalId)
      },
      {
        $set: {
          title: params.title,

          cities: params.cities,
          zones: params.zones || "",
          description: params.description,
          rewardTriggerType: params.rewardType,
          rewardTriggerTypeString: params.rewardTriggerTypeString,
          startTime: params.startTime,
          endTime: params.endTime,
          referrerDiscount: params.referrerDiscount,
          newUserDiscount: params.newUserDiscount,
          perUserLimit: params.perUserLimit,
          rewardTriggerType: params.rewardTriggerType,
          tripCount: params.tripCount,
          newUserBillingAmtTrigger: params.newUserBillingAmtTrigger,
          termsConditions: params.termsConditions,
          howITWorks: params.howITWorks
        }
      }
    );

  return result;
};

module.exports = {
  postReferralCampaign,
  validateReferral,
  updateReferralsStatus,
  getAllCampaignsByStatus,
  increaseCodeGeneratedCount,
  getCountByStatus,
  getCampaignById,
  increaseClaimCount,
  increaseQualifiedTripCount,
  increaseUnlockedCodeCount,
  updateReferral
};
