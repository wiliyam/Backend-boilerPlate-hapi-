const db = require("../../library/mongodb");
const tablename = "user";

//method is use for find user from db
const findOne = async condition => {
  const result = await db
    .get()
    .collection(tablename)
    .findOne(condition);
  return result;
};

//method is use for add user in db
const addUser = async data => {
  const result = await db
    .get()
    .collection(tablename)
    .insertOne(data);
  return result;
};

//method is use for update user data
const update = async (condition, data) => {
  const result = await db
    .get()
    .collection(tablename)
    .update(condition, { $set: data });
  return result;
};

//method is use for remove user from db
/**
 *
 * @param {*} condition
 */
const remove = async condition => {
  const result = await db
    .get()
    .collection(tablename)
    .remove(condition);

  return result;
};

/**
 *
 * @param {*} condition
 * @param {*} projection
 */
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
