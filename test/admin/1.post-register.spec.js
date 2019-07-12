require("dotenv").config();
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const baseUrl = "http://localhost:3000";

describe("Admin POST method for Registration", () => {
  it("should return 400 when wrong input or no input passes", done => {
    chai
      .request(baseUrl)
      .post("/admin/register")
      .set("content-type", "application/json")
      .field("userName", "admin")
      .field("password", "test")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message");
        done();
      });
  });
  it("should return 200 when new user registred successfully", done => {
    chai
      .request(baseUrl)
      .post("/admin/register")
      .set("content-type", "application/json")
      .field("userName", "admin")
      .field("password", "test")
      .field("conformPassword", "test")
      .field("email", "admin@app.com")
      .field("dob", "01-01-2002")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        done();
      });
  });
  it("should return 409 admin already exist", done => {
    chai
      .request(baseUrl)
      .post("/admin/register")
      .set("content-type", "application/json")
      .field("userName", "admin")
      .field("password", "test")
      .field("conformPassword", "test")
      .field("email", "admin@app.com")
      .field("dob", "01-01-2002")
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
