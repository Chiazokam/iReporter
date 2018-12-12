import app from "../server/app";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();
import { validToken } from "./testCreateIncidentRecord";
import dotenv from "dotenv";
dotenv.load();

const request = supertest.agent(app);


let tokenId2 = process.env.TOKEN_ID2;

const newValidToken = process.env.VALID_TOKEN;
let newRedFlagId = 3;




/**
 * Update red flag location
 */
describe("Update red flag location end-point", () => {


  it("should return 400 if geo-location is a valid geo-coordinate format", (done) => {
    request.patch(`/api/v1/red-flags/${1}/location`)
      .set("authorization", newValidToken)
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
      .set("authorization", newValidToken)
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
      .set("authorization", newValidToken)
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
      .set("authorization", newValidToken)
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
      .set("authorization", newValidToken)
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


  it("should return 200 if intervention record's location is updated", (done) => {
    request.patch("/api/v1/interventions/4/location")
      .set("authorization", validToken)
      .send({
        location: "11.21134, -7.2123",
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("Updated Intervention record's location");
        expect(res.body.data[0].message).to.be.a("string");
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
 * Update red flag and intervention comment
 */
describe("Update comment end-point", () => {

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


  it("should return 200 if intervention record's comment is updated", (done) => {
    request.patch("/api/v1/interventions/4/comment")
      .set("authorization", validToken)
      .send({
        comment: "i just change this intervention record",
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("Updated Intervention record's comment");
        expect(res.body.data[0].message).to.be.a("string");
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
        expect(res.body.data[0].message).to.eql("red-flag record's status updated");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 200 if status updates successfully", (done) => {
    request.patch(`/api/v1/interventions/${4}/status`)
      .set("authorization", process.env.VALID_TOKEN)
      .send({
        status: "resolved",
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("intervention record's status updated");
        expect(res.body.data[0].message).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 404 if admin is not found", (done) => {
    request.patch(`/api/v1/interventions/${4}/status`)
      .set("authorization", process.env.INVALID_ADMIN_TOKEN)
      .send({
        status: "resolved",
      }).end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.error).to.eql("admin not found");
        expect(res.body.error).to.be.a("string");
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
      .set("authorization", newValidToken)
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

  it("should return 404 if record is not found", (done) => {
    request.patch(`/api/v1/red-flags/${100000}/status`)
      .set("authorization", newValidToken)
      .send({
        status: "draft",
      }).end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("record not found");
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
      .set("authorization", newValidToken)
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
      .set("authorization", newValidToken)
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
      .set("authorization", validToken)
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
