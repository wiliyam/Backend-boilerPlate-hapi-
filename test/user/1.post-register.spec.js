require("dotenv").config();
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const baseUrl = "http://localhost:3000";

describe("user SIGNUP method for Registration", () => {
  it("should return 406 when password not match", done => {
    chai
      .request(baseUrl)
      .post("/user/signUp")
      .set("content-type", "application/json")
      .field("userName", "user")
      .field("password", "test")
      .field("conformPassword", "test122")
      .field("email", "user@app.com")
      .field("dob", "01-01-2002")
      .field("isAdmin", "false")
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body).to.have.property("message");
        done();
      });
  });
  it("should return 200 when new user registred successfully", done => {
    chai
      .request(baseUrl)
      .post("/user/signUp")
      .set("content-type", "application/json")
      .field("userName", "user")
      .field("password", "test")
      .field("conformPassword", "test")
      .field("email", "user@app.com")
      .field("dob", "01-01-2002")
      .field("isAdmin", "true")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        done();
      });
  });
  it("should return 409 user already exist", done => {
    chai
      .request(baseUrl)
      .post("/user/signUp")
      .set("content-type", "application/json")
      .field("userName", "user")
      .field("password", "test")
      .field("conformPassword", "test")
      .field("email", "user@app.com")
      .field("dob", "01-01-2002")
      .field("isAdmin", "false")
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
