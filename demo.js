require("dotenv").config();
const getHashppass = require("./web/middleware/genHashPass");

const hash = async () => {
  const hashPassword = await getHashppass("sssdsds");
  console.log(hashPassword);
};

hash();
