require("dotenv").config();
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const baseUrl = "http://localhost:3000";

describe("user SIGNIN method for Registration", () => {
  it("should return 401 when user not exist", done => {
    chai
      .request(baseUrl)
      .post("/user/signIn")
      .set("content-type", "application/json")
      .field("email", "user234")
      .field("password", "test1223")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message");
        done();
      });
  });
  it("should return 401 when user entered wrong password ", done => {
    chai
      .request(baseUrl)
      .post("/user/signIn")
      .set("content-type", "application/json")
      .field("email", "user@app.com")
      .field("password", "test1223")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should return 200 when user login successfully", done => {
    chai
      .request(baseUrl)
      .post("/user/signIn")
      .set("content-type", "application/json")
      .field("email", "user@app.com")
      .field("password", "test")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("tokens");
        done();
      });
  });
});
