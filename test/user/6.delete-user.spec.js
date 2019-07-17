require("dotenv").config();
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const config = require("config");
const generate = require("../../web/middleware/generate");
const user = require("../../models/user");
const baseUrl = "http://localhost:3000";

let id, accessToken;
const genrateToken = async () => {
  const userData = await user.findOne({ email: "user@app.com" });
  const exDate = Number(config.get("jwtExpireTime"));
  accessToken = generate.genToken(
    exDate,
    userData._id,
    userData.email,
    userData.isAdmin
  ); //generate jwtToken

  id = userData._id;

  let refreshToken = generate.genToken(
    exDate + 3600,
    userData._id,
    userData.email,
    userData.isAdmin
  );
  let tokens = { accessToken, refreshToken }; //store new token in database
  const result = await user.update({ email: "user@app.com" }, tokens);
};

describe("user DELETE method ", () => {
  it("should return 401 when user is unauthenticate", done => {
    genrateToken();
    chai
      .request(baseUrl)
      .delete("/user/deleteUser")
      .set("content-type", "application/json")
      .field("userId", `${id}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message");
        done();
      });
  });
  it("should return 200 when user is deleted with valid token", done => {
    chai
      .request(baseUrl)
      .delete("/user/deleteUser")
      .set("content-type", "application/json")
      .set("Authorization", accessToken)
      .field("userId", `${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
