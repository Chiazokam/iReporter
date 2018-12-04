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

const geo_location = "12.233334, 2.323123";


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


describe("The if condition in the Create red-flag record controller end-point", () => {

	it("should return 201 if all input fields are validated correctly", (done) => {
		request.post(red_flags)
			.send({
				"createdBy": 2,
				"title": "Stealing",
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

});




