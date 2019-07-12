require("dotenv").config();
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const ObjectId = require("mongodb").ObjectID;

const getToken = require("../../web/middleware/genAtuhToken");
const baseUrl = "http://localhost:3000";

describe("user GET method ", () => {
  it("should return 401 when user is unauthenticate or passinvalid token", done => {
    let email = "user@app.com";
    let admin = false;
    let token = getToken(email, admin);
    chai
      .request(baseUrl)
      .get("/user/getUser")
      .set("Authorization", token)
      .set("content-type", "application/json")
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message");
        done();
      });
  });

  it("should return 200 when user is authenticate and pass valid token and have admin rights", done => {
    let id = ObjectId("5d28750c032eb208b0534e32");
    let email = "admin@app.com";
    let admin = true;
    let token = getToken(id, email, admin);
    chai
      .request(baseUrl)
      .get("/user/getUser")
      .set("content-type", "application/json")
      .set("Authorization", token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("users");
        done();
      });
  });
});
