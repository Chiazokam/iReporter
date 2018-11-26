import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);

const incidents = "/api/v1/incidents";
const rootFile = "/api/v1/";
const red_flags = "/api/v1/red-flags";

describe("GET all incident records endpoint", () => {

	it("should return status 200 if records exist in the database", (done) => {
		request
			.get(incidents)
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
			.get(rootFile)
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

describe("GET all red-flag records endpoint", () => {

	it("should return status 200 if red-flag records exist in the database", (done) => {
		request
			.get(red_flags)
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


