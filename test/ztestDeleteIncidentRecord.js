import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();
import chaiHttp from "chai-http";

chai.use(chaiHttp);

const request = supertest.agent(app);

const red_flags = "/api/v1/red-flags";
const URI1 = 1;
const URI2 = 3;



describe("DELETE a specific red-flag record endpoint", () => {

  it("should return status 200 if specified red-flag record has been deleted", (done) => {
    request
      .delete(`${red_flags}/${URI1}`)
      .send({
        createdBy:1,
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].id).to.eql(URI1);
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

  it("should return status 401 if userId does match the ID of the record being deleted", (done) => {
    request
      .delete(`${red_flags}/${URI2}`)
      .send({
        createdBy: 1,
      })
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql("your not allowed to perform that action");
        expect(res.body.status).to.eql(401);
        expect(res.body.status).to.be.a("number");
        expect(res.body.error).to.be.a("string");
        should.not.exist(err);
        should.exist(res.body);
        if (err) { return done(err); }
        done();
      });
  });

});





