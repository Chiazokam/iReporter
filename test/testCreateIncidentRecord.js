import app from "../server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);


/**
 * Create red-flag record
 */
describe("Create red-flag record end-point", () => {

	it("should return 201 if all input fields are validated correctly", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 2,
				"title": "Stealing",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"imageURL1",
					"imageURL2" ],
				"videos": [
					"videoURL1",
					"videoURL2" ],
				"comment": "This is a report on... to be continued"
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
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "Stealing",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [],
				"videos": [],
				"comment": "This is a report on... to be continued"
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

	it("should return 404 if user doesn't exist", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 100000,
				"title": "Stealing",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"imageURL1",
					"imageURL2"],
				"videos": [
					"videoURL1",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
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

	it("should return 400 if the createdBy input is not a number datatype", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": "1",
				"title": "Theft",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"imageURL1",
					"imageURL2"],
				"videos": [
					"videoURL1",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
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

	it("should return 400 if the type input isn't tightly equal to red-flag", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "Theft",
				"type": "intervention",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"imageURL1",
					"imageURL2"],
				"videos": [
					"videoURL1",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
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

	it("should return 400 if some inputs are left empty", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"imageURL1",
					"imageURL2"],
				"videos": [
					"videoURL1",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
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

	it("should return 400 if some inputs are not strings", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": true,
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"imageURL1",
					"imageURL2"],
				"videos": [
					"videoURL1",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
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

	it("should return 400 if some inputs have white space althrough", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "        ",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"imageURL1",
					"imageURL2"],
				"videos": [
					"videoURL1",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
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

	it("should return 400 if some inputs are not arrays", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "Theft",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": "imageURL1",
				"videos": [
					"videoURL1",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
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

	it("should return 400 if inputs inside the images array are not strings", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "Theft",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": ["imageURL1"],
				"videos": [
					2468,
					"videoURL2"],
				"comment": "This is a report on... to be continued"
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("invalid input");
				expect(res.body.status).to.eql(400);
				expect(res.body.error).to.be.a("string");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if inputs inside the videos array are not strings", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "Theft",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					2,
					"imageURL1"],
				"videos": [
					"videoURL2",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("invalid input");
				expect(res.body.status).to.eql(400);
				expect(res.body.error).to.be.a("string");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if inputs inside the images array are undefined", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "Theft",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"",
					"imageURL1"],
				"videos": [
					"videoURL2",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("undefined input");
				expect(res.body.status).to.eql(400);
				expect(res.body.error).to.be.a("string");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});

	it("should return 400 if inputs inside the video array are undefined", (done) => {
		request.post("/api/v1/red-flags")
			.send({
				"createdBy": 1,
				"title": "Theft",
				"type": "red-flag",
				"location": "Jos",
				"latitude": "2.123456",
				"longitude": "13.131131",
				"images": [
					"imageURL1",
					"imageURL1"],
				"videos": [
					"",
					"videoURL2"],
				"comment": "This is a report on... to be continued"
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("undefined input");
				expect(res.body.status).to.eql(400);
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




