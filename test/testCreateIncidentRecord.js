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
const geo_location = "12.233334, 2.323123";

let validToken;
const invalidToken = "invalidToken";
let tokenId2 = process.env.TOKEN_ID2;

const newValidToken = process.env.VALID_TOKEN;
let newRedFlagId;


/**
 * Create red-flag record
 */
describe("Create red-flag record end-point", () => {

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
        newRedFlagId = res.body.data[0].id;
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
        "type": "intervention",
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








/**
 * Update red flag location
 */
describe("Update red flag location end-point", () => {


  it("should return 400 if geo-location is a valid geo-coordinate format", (done) => {
    request.patch(`/api/v1/red-flags/${1}/location`)
      .set("authorization", validToken)
      .send({
        location: "North1.233, Lagos",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid location format");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if location is a not a string", (done) => {
    request.patch(`/api/v1/red-flags/${1}/location`)
      .set("authorization", validToken)
      .send({
        "location": ["6757"],
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid input location");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if location is filled with only white spaces", (done) => {
    request.patch(`/api/v1/red-flags/${1}/location`)
      .set("authorization", validToken)
      .send({
        "location": "     ",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid location format");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if location is not defined", (done) => {
    request.patch(`/api/v1/red-flags/${1}/location`)
      .set("authorization", validToken)
      .send({
        "location": "",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("location required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 403 if the user ID doesn't match the createdBy ID of the redflag in the database", (done) => {
    request.patch(`/api/v1/red-flags/${newRedFlagId}/location`)
      .set("authorization", validToken)
      .send({
        "location": "12.233334, 2.323123",
      }).end((err, res) => {
        expect(res.status).to.eql(403);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("your not allowed to perform that action");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 200 if location is updated successfully", (done) => {
    request.patch(`/api/v1/red-flags/${1}/location`)
      .set("authorization", newValidToken)
      .send({
        "location": "12.233334, 2.323123",
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("Updated red-flag record's location");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

});





/**
 * Update red flag comment
 */
describe("Update red flag comment end-point", () => {

  it("should return 403 if the paramId doesn't match the userId of the user in the database", (done) => {
    request.patch(`/api/v1/red-flags/${3}/comment`)
      .set("authorization", newValidToken)
      .send({
        "comment": "changed the comment again",
      }).end((err, res) => {
        expect(res.status).to.eql(403);
        expect(res.body.error).to.eql("your not allowed to perform that action");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 200 if comment updates successfully", (done) => {
    request.patch(`/api/v1/red-flags/${1}/comment`)
      .set("authorization", newValidToken)
      .send({
        "comment": "I just changed the comment",
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("Updated red-flag record's comment");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if comment is undefined", (done) => {
    request.patch(`/api/v1/red-flags/${1}/comment`)
      .set("authorization", newValidToken)
      .send({
        "comment": "",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("comment field is required");
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



/**
 * Update users profile image
 */
describe("Update user profile image end-point", () => {

  it("should return 200 if profile image updates successfully", (done) => {
    request.patch(`/api/v1/users/${1}/profile-image`)
      .set("authorization", newValidToken)
      .send({
        profileImage: "imageUrl",
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("profile image updated");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });




  it("should return 403 if the resquest body createdBy ID doesn't match the createdBy ID of the redflag in the database", (done) => {
    request.patch(`/api/v1/users/${3}/profile-image`)
      .set("authorization", tokenId2)
      .send({
        profileImage: "changedImageUrl",
      }).end((err, res) => {
        expect(res.status).to.eql(403);
        expect(res.body.error).to.eql("your not allowed to perform that action");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if user doesn't exist", (done) => {
    request.patch(`/api/v1/users/${1000000}/profile-image`)
      .set("authorization", tokenId2)
      .send({
        profileImage: "samplepictureUrl",
      }).end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.error).to.eql("user not found");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if image url isn't a string", (done) => {
    request.patch(`/api/v1/users/${1}/profile-image`)
      .set("authorization", process.env.VALID_TOKEN)
      .send({
        profileImage: 1234567,
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("invalid profile image input");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if image is undefined", (done) => {
    request.patch(`/api/v1/users/${1}/profile-image`)
      .set("authorization", process.env.VALID_TOKEN)
      .send({
        profileImage: "",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("profile image required");
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






/**
 * Update user status by Admin
 */
describe("Update status of an incident", () => {

  it("should return 200 if status updates successfully", (done) => {
    request.patch(`/api/v1/red-flags/${1}/status`)
      .set("authorization", process.env.VALID_TOKEN)
      .send({
        status: "resolved",
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("record's status updated");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if status is undefined", (done) => {
    request.patch(`/api/v1/red-flags/${1}/status`)
      .set("Authorization", newValidToken)
      .send({
        status: "",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("status required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if status is not a string", (done) => {
    request.patch(`/api/v1/red-flags/${1}/status`)
      .set("Authorization", newValidToken)
      .send({
        status: 1232434,
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid input status");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if status not a required status", (done) => {
    request.patch(`/api/v1/red-flags/${1}/status`)
      .set("Authorization", newValidToken)
      .send({
        status: "disposed",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid status selection");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if user is not admin", (done) => {
    request.patch(`/api/v1/red-flags/${1}/status`)
      .set("Authorization", validToken)
      .send({
        status: "under investigation",
      }).end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql("not an admin");
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


