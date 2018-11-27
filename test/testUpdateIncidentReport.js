import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);


const URI = 1;
const edit_red_flag_location = `/api/v1/red-flags/${URI}/location`;
const URI2 = 1;
const edit_red_flag_comment = `/api/v1/red-flags/${URI2}/comment`;

/**
 * Update red flag location
 */
describe("Update red flag location end-point", () => {

	it("should return 200 if location is updated successfully", (done) => {
		request.patch(edit_red_flag_location)
			.send({
				"createdBy": 1,
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

	it("should return 400 if geo-location is a valid geo-coordinate format", (done) => {
		request.patch(edit_red_flag_location)
			.send({
				"createdBy": 1,
				"location": "North1.233, Lagos",
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("invalid input");
				expect(res.body.error).to.be.a("string");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if location is a not a string", (done) => {
		request.patch(edit_red_flag_location)
			.send({
				"createdBy": 1,
				"location": ["6757"],
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("invalid input");
				expect(res.body.error).to.be.a("string");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if location is filled with only white spaces", (done) => {
		request.patch(edit_red_flag_location)
			.send({
				"createdBy": 1,
				"location": "     ",
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("undefined input");
				expect(res.body.error).to.be.a("string");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});


	it("should return 400 if location is not defined", (done) => {
		request.patch(edit_red_flag_location)
			.send({
				"createdBy": 1,
				"location": "",
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("undefined input");
				expect(res.body.error).to.be.a("string");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 401 if the resquest body createdBy ID doesn't match the createdBy ID of the redflag in the database", (done) => {
		request.patch(`/api/v1/red-flags/${3}/location`)
			.send({
				"createdBy": 1,
				"location": "12.233334, 2.323123",
			}).end((err, res) => {
				expect(res.status).to.eql(401);
				expect(res.body.error).to.eql("invalid user");
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
 * Update red flag comment
 */
describe("Update red flag comment end-point", () => {

	it("should return 200 if comment is updated successfully", (done) => {
		request.patch(edit_red_flag_comment)
			.send({
				"createdBy": 1,
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

	it("should return 401 if the resquest body createdBy ID doesn't match the createdBy ID of the redflag in the database", (done) => {
		request.patch(`/api/v1/red-flags/${1}/comment`)
			.send({
				"createdBy": 2,
				"comment": "changed the comment again",
			}).end((err, res) => {
				expect(res.status).to.eql(401);
				expect(res.body.error).to.eql("invalid user");
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



