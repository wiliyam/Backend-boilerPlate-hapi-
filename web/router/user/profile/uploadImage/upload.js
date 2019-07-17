const user = require("../../../../../models/user");
const Boom = require("boom");
const ObjectId = require("mongodb").ObjectID;
const fs = require("fs");
const path = require("path");

//
const handler = async (req, h) => {
  const image = req.payload.image;

  const { id } = h.request.auth.credentials; //get credentials

  const imgPath = path.join(
    process.cwd(),
    `/assets/profileImg/profile-${id}.jpg`
  );

  const condition = { _id: ObjectId(id) };
  const data = { profileImg: imgPath };

  return new Promise((res, rej) => {
    fs.writeFile(imgPath, image, async err => {
      if (err) rej(Boom.badImplementation("some thig went wrong", err));

      const result = await user.update(condition, data);
      if (!result) rej(Boom.badImplementation("some thig went wrong", err));
      return res({ message: "image successfully uploaded" });
    });
  });
};

module.exports = { handler };
