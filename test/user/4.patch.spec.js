require("dotenv").config();
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const ObjectId = require("mongodb").ObjectID;

const getToken = require("../../web/middleware/genAtuhToken");
const baseUrl = "http://localhost:3000";

describe("user PATCH method ", () => {
  it("should return 401 when user is unauthenticate", done => {
    chai
      .request(baseUrl)
      .patch("/user/updateUser")
      .set("content-type", "application/json")
      .field("name", "newuser")
      .field("dob", "01-01-2000")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message");
        done();
      });
  });
  it("should return 200 when user is updated with valid token", done => {
    let id = ObjectId("5d28750c032eb208b0534e32");
    let email = "user@app.com";
    let admin = false;
    let token = getToken(id, email, admin);

    chai
      .request(baseUrl)
      .patch("/user/updateUser")
      .set("content-type", "application/json")
      .set("Authorization", token)
      .field("name", "newuser")
      .field("dob", "01-01-2000")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});