import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);

const validToken = process.env.VALID_TOKEN;

const rootFile = "/";
const red_flags = "/api/v1/red-flags";
const interventions = "/api/v1/interventions";
const validURI = 1;
const invalidURI = 1000000;

describe("the root endpoint", () => {


  it("should return status 200 if you access ony the root directory", (done) => {
    request
      .get(rootFile)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql(200);
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body.data[0]).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });
});

/**
 * get all red-flags
 */
describe("GET all red-flag records endpoint", () => {

  it("should return status 200 if red-flag records exist in the database", (done) => {
    request
      .get(red_flags)
      .set("authorization", validToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql(200);
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body.data[0]).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

});

describe("GET all intervention records endpoint", () => {

  it("should return status 200 if intervention records exist in the database", (done) => {
    request
      .get(interventions)
      .set("authorization", validToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql(200);
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body.data[0]).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

});





/**
 * Get status number count
 */
describe("GET status number endpoints", () => {

  it("should return status 200 if status count return was successful for red flag", (done) => {
    request
      .get(`${red_flags}/createdby/${1}/status`)
      .set("authorization", validToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql(200);
        expect(res.body.status).to.be.a("number");
        (res.body.data[0]).should.be.an("object");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });

  it("should return status 200 if status count return was successful for intervention", (done) => {
    request
      .get(`${interventions}/createdby/${1}/status`)
      .set("authorization", validToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql(200);
        expect(res.body.status).to.be.a("number");
        (res.body.data[0]).should.be.an("object");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });

  it("should return status 200 if status count returns with zero", (done) => {
    request
      .get(`${interventions}/${100}/status-count`)
      .set("authorization", validToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql(200);
        expect(res.body.status).to.be.a("number");
        (res.body.data[0]).should.be.an("object");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });
});


/**
 * Get specific red-flag
 */
describe("GET a specific red-flag record endpoint", () => {

  it("should return status 200 if specified red-flag record exist in the database", (done) => {
    request
      .get(`${red_flags}/${validURI}`)
      .set("authorization", validToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql(200);
        expect(res.body.status).to.be.a("number");
        (res.body.data[0]).should.be.an("object");
        (res.body.data[0].id).should.be.an("number");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });

  it("should return status 404 if specified red-flag record doesn't exist in the database", (done) => {
    request
      .get(`${red_flags}/${invalidURI}`)
      .set("authorization", validToken)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.error).to.eql("record not found");
        expect(res.body.status).to.eql(404);
        expect(res.body.status).to.be.a("number");
        expect(res.body.error).to.be.a("string");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });

});


