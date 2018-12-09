import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

import dotenv from "dotenv";
dotenv.load();

const request = supertest.agent(app);

const red_flags = "/api/v1/red-flags";
const interventions = "/api/v1/interventions";
const geo_location = "12.233334, 2.323123";

export let validToken;
const invalidToken = "invalidToken";

const newValidToken = process.env.VALID_TOKEN;


/**
 * Create Incident record
 */
describe("Create Incident record end-point", () => {

  before((done) => {
    chai.request(app)
      .post("/api/v1/auth/signup")
      .send({
        "username": "test101",
        "firstname": "janeTest",
        "lastname": "doeTest",
        "othername": "JadeTest",
        "phoneNumber": "07067163101",
        "email": "janedoetest101@gmail.com",
        "password": "asdfghj101",
        "confirmPassword": "asdfghj101"
      })
      .end((error, res) => {
        validToken = res.body.data[0].token;
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post("/api/v1/auth/signup")
      .send({
        "username": "test202",
        "firstname": "janeTest",
        "lastname": "doeTest",
        "othername": "JadeTest",
        "phoneNumber": "07067163202",
        "email": "janedoetest202@gmail.com",
        "password": "asdfghj202",
        "confirmPassword": "asdfghj202"
      })
      .end((err) => {
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 201 if all input fields are validated correctly", (done) => {
    request.post(red_flags)
      .set("authorization", newValidToken)
      .send({
        "title": "I have an Image link",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL2"],
        "videos": [
          "videoURL1",
          "videoURL2"],
        "comment": "This is a report on... To be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.data[0].message).to.eql("Created red-flag record");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 201 if all input fields are validated correctly", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "I have an Image link",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL2" ],
        "videos": [
          "videoURL1",
          "videoURL2" ],
        "comment": "This is a report on... To be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.data[0].message).to.eql("Created red-flag record");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 201 if all input fields are validated correctly", (done) => {
    request.post(interventions)
      .set("authorization", validToken)
      .send({
        "title": "This is an intervention report",
        "type": "intervention",
        "location": geo_location,
        "images": [
          "evidenceImage",
          "imageURL2"],
        "videos": [
          "evidenceVideo",
          "videoURL2"],
        "comment": "This is a report on... To be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.data[0].message).to.eql("Created intervention record");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 201 if all input fields are validated and their are no video or image links", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "I have no image link",
        "type": "red-flag",
        "location": geo_location,
        "images": [],
        "videos": [],
        "comment": "This is a report on... not be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.data[0].message).to.eql("Created red-flag record");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if the type input isn't tightly equal to red-flag", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "Theft",
        "type": "intervenx",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL2"
        ],
        "videos": [
          "videoURL1",
          "videoURL2"
        ],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid incident type");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if some inputs are left empty for instance TITLE", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL2"],
        "videos": [
          "videoURL1",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("input field title required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if some inputs are not strings for instance TITLE", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": true,
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL2"],
        "videos": [
          "videoURL1",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid input field title");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if some inputs have white space althrough", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "        ",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL2"],
        "videos": [
          "videoURL1",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("title is required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if some inputs are not arrays", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "Theft",
        "type": "red-flag",
        "location": geo_location,
        "images": "imageURL1",
        "videos": [
          "videoURL1",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("images and videos should be an array");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if inputs inside the images array are not strings", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "Theft",
        "type": "red-flag",
        "location": geo_location,
        "images": ["imageURL1"],
        "videos": [
          2468,
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid videos link");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if inputs inside the videos array are not strings", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "Theft",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          2,
          "imageURL1"],
        "videos": [
          "videoURL2",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid images link");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if inputs inside the images array are undefined", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "Theft",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "",
          "imageURL1"],
        "videos": [
          "videoURL2",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("images link required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if inputs inside the video array are undefined", (done) => {
    request.post(red_flags)
      .set("authorization", validToken)
      .send({
        "title": "Theft",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL1"],
        "videos": [
          "",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("videos link required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 401 if token isn't provided", (done) => {
    request.post(red_flags)
      .send({
        "title": "Theft",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL1"],
        "videos": [
          "",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql("Token not provided");
        expect(res.body.status).to.eql(401);
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 401 if token provided is invalid", (done) => {
    request.post(red_flags)
      .set("authorization", invalidToken)
      .send({
        "title": "Theft",
        "type": "red-flag",
        "location": geo_location,
        "images": [
          "imageURL1",
          "imageURL1"],
        "videos": [
          "",
          "videoURL2"],
        "comment": "This is a report on... to be continued"
      }).end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql("Invalid Token");
        expect(res.body.status).to.eql(401);
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


});


