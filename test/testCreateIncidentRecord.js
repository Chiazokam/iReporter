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

let validToken = "";
const invalidToken = "invalidToken";
let tokenId2 = process.env.TOKEN_ID2;


let redFlagId = 2;
let usersId = 2;

const edit_red_flag_location = `/api/v1/red-flags/${redFlagId}/location`;

const edit_red_flag_comment = `/api/v1/red-flags/${redFlagId}/comment`;

const profile_image_endpoint = `/api/v1/users/${usersId}/profile-image`;



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
				"phoneNumber": "07067163736",
				"email": "janedoetest@gmail.com",
				"password": "asdfghj",
				"confirmPassword": "asdfghj"
			})
			.end((error, res) => {
				validToken = res.body.data[0].token;
				done();
			});

	});


	it("should return 201 if all input fields are validated correctly", (done) => {
		request.post(red_flags)
			.set("authorization", validToken)
			.send({
				"title": "Stealing",
				"type": "red-flag",
				"location": geo_location,
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
		request.post(red_flags)
			.set("authorization", validToken)
			.send({
				"title": "Stealing",
				"type": "red-flag",
				"location": geo_location,
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


	it("should return 400 if the type input isn't tightly equal to red-flag", (done) => {
		request.post(red_flags)
			.set("authorization", validToken)
			.send({
				"title": "Theft",
				"type": "intervention",
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

	it("should return 403 if token isn't provided", (done) => {
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
				expect(res.status).to.eql(403);
				expect(res.body.error).to.eql("Token not provided");
				expect(res.body.status).to.eql(403);
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


	it("should return 200 if location is updated successfully", (done) => {
		request.patch(edit_red_flag_location)
			.set("authorization", tokenId2)
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

	it("should return 400 if geo-location is a valid geo-coordinate format", (done) => {
		request.patch(edit_red_flag_location)
			.set("authorization", tokenId2)
			.send({
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
			.set("authorization", tokenId2)
			.send({
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
			.set("authorization", tokenId2)
			.send({
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
			.set("authorization", tokenId2)
			.send({
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

	it("should return 400 if the user ID doesn't match the createdBy ID of the redflag in the database", (done) => {
		request.patch(`/api/v1/red-flags/${1}/location`)
			.set("authorization", tokenId2)
			.send({
				"location": "12.233334, 2.323123",
			}).end((err, res) => {
				expect(res.status).to.eql(400);
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

	it("should return 200 if profile image updates successfully", (done) => {
		request.patch(edit_red_flag_comment)
			.set("authorization", tokenId2)
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

	it("should return 400 if the paramId doesn't match the userId of the user in the database", (done) => {
		request.patch(`/api/v1/red-flags/${1}/comment`)
			.set("authorization", tokenId2)
			.send({
				"comment": "changed the comment again",
			}).end((err, res) => {
				expect(res.status).to.eql(400);
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
 * Update users profile image
 */
describe("Update user profile image end-point", () => {

	it("should return 200 if profile image updates successfully", (done) => {
		request.patch(profile_image_endpoint)
			.set("authorization", tokenId2)
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



	it("should return 400 if white space is found", (done) => {
		request.patch(profile_image_endpoint)
			.set("authorization", tokenId2)
			.send({
				profileImage: "image Url",
			}).end((err, res) => {
				expect(res.status).to.eql(400);
				expect(res.body.error).to.eql("white space detected");
				expect(res.body.error).to.be.a("string");
				expect(res.body.status).to.be.a("number");
				should.not.exist(err);
				should.exist(res.body);
				(res.body).should.be.an("object");
				if (err) { return done(err); }
				done();
			});
	});



	it("should return 400 if the resquest body createdBy ID doesn't match the createdBy ID of the redflag in the database", (done) => {
		request.patch(`/api/v1/users/${1}/profile-image`)
			.set("authorization", tokenId2)
			.send({
				profileImage: "changedImageUrl",
			}).end((err, res) => {
				expect(res.status).to.eql(400);
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

});





