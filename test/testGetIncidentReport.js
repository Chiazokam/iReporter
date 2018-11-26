import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);


describe("GET all incident report endpoint", () => {

	it("should return status 200 if records exist in the database", (done) => {
		request
			.get("/api/v1/incidents")
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

	it("should return status 200 if you access ony the root directory", (done) => {
		request
			.get("/api/v1/")
			.end((err, res) => {
				expect(res.status).to.eql(200);
				expect(res.body.status).to.eql(200);
				expect(res.body.data[0].message).to.eql("welcome to ireporter");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body.data[0]).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});
});


