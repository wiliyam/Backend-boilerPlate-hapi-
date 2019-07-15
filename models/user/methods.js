const db = require("../../library/mongodb");

const tablename = "user";

const findOne = async condition => {
  const result = await db
    .get()
    .collection(tablename)
    .findOne(condition);
  return result;
};

const addUser = async data => {
  const result = await db
    .get()
    .collection(tablename)
    .insertOne(data);
  return result;
};

const update = async (condition, data) => {
  const result = await db
    .get()
    .collection(tablename)
    .update(condition, { $set: data });
  return result;
};

const remove = async condition => {
  const result = await db
    .get()
    .collection(tablename)
    .remove(condition);

  return result;
};

const findAll = async (condition, projection) => {
  const userData = await db
    .get()
    .collection(tablename)
    .find(condition)
    .project(projection);
  const userDataArray = await userData.toArray();
  return userDataArray;
};

module.exports = {
  findOne,
  addUser,
  findAll,
  update,
  remove
};
