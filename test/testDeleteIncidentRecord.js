import app from "../server/app";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();
import chaiHttp from "chai-http";

import { validToken } from "./testCreateIncidentRecord";

chai.use(chaiHttp);

const request = supertest.agent(app);

const red_flags = "/api/v1/red-flags";
const interventions = "/api/v1/interventions";
const URI1 = 2;
const URI2 = 3;



describe("DELETE a specific red-flag record endpoint", () => {

  it("should return status 200 if specified red-flag record has been deleted", (done) => {
    request
      .delete(`${red_flags}/${URI1}`)
      .set("authorization", process.env.VALID_TOKEN)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].id).to.eql(`${URI1}`);
        expect(res.body.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("red-flag record has been deleted");
        expect(res.body.status).to.be.a("number");
        (res.body.data[0]).should.be.an("object");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 404 is updated record has been deleted", (done) => {
    request.patch("/api/v1/red-flags/2/location")
      .set("authorization", process.env.VALID_TOKEN)
      .send({
        location: "11.21134, -7.2123",
      }).end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.error).to.eql("record not found");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return status 200 if specified red-flag record has been deleted", (done) => {
    request
      .delete(`${interventions}/${4}`)
      .set("authorization", validToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].id).to.eql(`${4}`);
        expect(res.body.status).to.eql(200);
        expect(res.body.data[0].message).to.eql("Intervention record has been deleted");
        expect(res.body.status).to.be.a("number");
        (res.body.data[0]).should.be.an("object");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });

  it("should return status 403 if userId does match the ID of the record being deleted", (done) => {
    request
      .delete(`${red_flags}/${URI2}`)
      .set("authorization", process.env.VALID_TOKEN)
      .end((err, res) => {
        expect(res.status).to.eql(403);
        expect(res.body.error).to.eql("your not allowed to perform that action");
        expect(res.body.status).to.eql(403);
        expect(res.body.status).to.be.a("number");
        expect(res.body.error).to.be.a("string");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });


  it("should return status 404 if record has been deleted", (done) => {
    request
      .delete(`${red_flags}/${10000}`)
      .set("authorization", process.env.VALID_TOKEN)
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



