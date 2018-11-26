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
const validURI = 1;
const invalidURI = 1000000;

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

describe("GET a specific red-flag record endpoint", () => {

	it("should return status 200 if specified red-flag record exist in the database", (done) => {
		request
			.get(`${red_flags}/${validURI}`)
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

	it("should return status 404 if specified red-flag record doesn't exist in the database", (done) => {
		request
			.get(`${red_flags}/${invalidURI}`)
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


