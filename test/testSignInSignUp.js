import app from "../server/server";
import supertest from "supertest";
import chai from "chai";
const expect = chai.expect;
import "chai/register-should";
const should = chai.should();

const request = supertest.agent(app);

const signupRoute = "/api/v1/auth/signup";
const signinRoute = "/api/v1/auth/login";


/**
 * Signup user
 */
describe("Signup user end-point", () => {

  it("should return 201 if all input fields are validated correctly", (done) => {
    request.post(signupRoute)
      .send({
        "username": "Emie007",
        "firstname": "Emeka",
        "lastname": "Nwabuzor",
        "othername": "obi",
        "phoneNumber": "07012345678",
        "email": "mcemie4eva@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.data[0].token).to.be.a("string");
        expect(res.body.data[0].user).to.be.a("object");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 201 if othername field is skipped", (done) => {
    request.post(signupRoute)
      .send({
        "username": "sulaiman007",
        "firstname": "sule",
        "lastname": "man",
        "othername": "",
        "phoneNumber": "07098765412",
        "email": "sule.man@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.data[0].token).to.be.a("string");
        expect(res.body.data[0].user).to.be.a("object");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if othername field has non-alphabetic characters", (done) => {
    request.post(signupRoute)
      .send({
        "username": "sulaiman103",
        "firstname": "sule",
        "lastname": "man",
        "othername": "127364",
        "phoneNumber": "07098205412",
        "email": "slain.man@gmail.com",
        "password": "asdfghj1",
        "confirmPassword": "asdfghj1"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("invalid othername character");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if user already exist at signup", (done) => {
    request.post(signupRoute)
      .send({
        "username": "sulaiman007",
        "firstname": "sule",
        "lastname": "man",
        "othername": "",
        "phoneNumber": "07098765412",
        "email": "sule.man@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("user already exist");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if any input field is undefined", (done) => {
    request.post(signupRoute)
      .send({
        "username": "",
        "firstname": "Emeka",
        "lastname": "Nwabuzor",
        "othername": "obi",
        "phoneNumber": "07067443245",
        "email": "nwabuzor.obiora@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if white space is detected in some fields", (done) => {
    request.post(signupRoute)
      .send({
        "username": "mekus mekus",
        "firstname": "Emeka",
        "lastname": "Nwabuzor",
        "othername": "obi",
        "phoneNumber": "07067443245",
        "email": "nwabuzor.obiora@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("remove white-space from username");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if any input field has only white-spaces", (done) => {
    request.post(signupRoute)
      .send({
        "username": "  ",
        "firstname": "Emeka",
        "lastname": "Nwabuzor",
        "othername": "obi",
        "phoneNumber": "07067443245",
        "email": "nwabuzor.obiora@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if any input field is not a string", (done) => {
    request.post(signupRoute)
      .send({
        "username": "obiora",
        "firstname": 23465,
        "lastname": "Nwabuzor",
        "othername": "obi",
        "phoneNumber": "07067443245",
        "email": "nwabuzor.obiora@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if email isn't valid", (done) => {
    request.post(signupRoute)
      .send({
        "username": "obiora",
        "firstname": "emeka",
        "lastname": "Nwabuzor",
        "othername": "obi",
        "phoneNumber": "07067443245",
        "email": "nwabuzor.obiora",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("invalid email");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if password doesn't match", (done) => {
    request.post(signupRoute)
      .send({
        "username": "obiora",
        "firstname": "emeka",
        "lastname": "Nwabuzor",
        "othername": "obi",
        "phoneNumber": "07067443245",
        "email": "nwabuzor.obiora@gmail.com",
        "password": "123455",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("password didn't match");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if name field has numbers characters", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "98segun123",
        "lastname": "Nwabuzor",
        "othername": "lailai",
        "phoneNumber": "07067429385",
        "email": "lai.segun@yahoo.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });



  it("should return 400 if othername is not a string", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "segun",
        "lastname": "Nwabuzor",
        "othername": 12334,
        "phoneNumber": "07067429385",
        "email": "lai.segun@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if othername has white-space all through", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "segun",
        "lastname": "Nwabuzor",
        "othername": "         ",
        "phoneNumber": "07067429385",
        "email": "lai.segun@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if username length is less than 2", (done) => {
    request.post(signupRoute)
      .send({
        "username": "l",
        "firstname": "segun",
        "lastname": "Nwabuzor",
        "othername": "",
        "phoneNumber": "07076546830",
        "email": "lai.segun@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("username length should be above 2");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if firstname length is less than 2", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "s",
        "lastname": "Mohammed",
        "othername": "",
        "phoneNumber": "07076546830",
        "email": "lai.segun@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("firstname length should be above 2");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if lastname length is less than 2", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "segun",
        "lastname": "M",
        "othername": "",
        "phoneNumber": "07076546830",
        "email": "lai.segun@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("lastname length should be above 2");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if password length is less than 6 or greater than 20", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "segun",
        "lastname": "Mohammed",
        "othername": "",
        "phoneNumber": "07076546830",
        "email": "lai.segun@gmail.com",
        "password": "asdf",
        "confirmPassword": "asdf"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("password length should be between 6 and 20");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if password length is less than 6 or greater than 20", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "segun",
        "lastname": "Mohammed",
        "othername": "",
        "phoneNumber": "07076546830",
        "email": "lai.segun@gmail.com",
        "password": "asdf8472837%%%####%%%78*&(****((*(*(*&&%%&^*&",
        "confirmPassword": "asdf8472837%%%####%%%78*&(****((*(*(*&&%%&^*&"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("password length should be between 6 and 20");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if phone number doesn't contain numbers", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "segun",
        "lastname": "Nwabuzor",
        "othername": "",
        "phoneNumber": "k7067429385",
        "email": "lai.segun@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("invalid phoneNumber character");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if phoneNumber length is not 11", (done) => {
    request.post(signupRoute)
      .send({
        "username": "lai",
        "firstname": "segun",
        "lastname": "Nwabuzor",
        "othername": "",
        "phoneNumber": "080674293",
        "email": "lai.segun@gmail.com",
        "password": "asdfghj",
        "confirmPassword": "asdfghj"
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("phone number should be 11 characters");
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
 * Signin user
 */
describe("Signin user end-point", () => {

  it("should return 200 if all input fields are validated correctly", (done) => {
    request.post(signinRoute)
      .send({
        "emailUsername": "nwabuzor.obiora@gmail.com",
        "password": "asdf;lkj",
      }).end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data[0].token).to.be.a("string");
        expect(res.body.data[0].user).to.be.a("object");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if password is incorrect", (done) => {
    request.post(signinRoute)
      .send({
        "emailUsername": "nwabuzor.obiora@gmail.com",
        "password": "iAmInCorrect",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("incorrect username or password");
        expect(res.body.error).to.be.a("string");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });


  it("should return 400 if type of input is a boolean", (done) => {
    request.post(signinRoute)
      .send({
        "emailUsername": true,
        "password": false,
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("invalid email/username or password");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if email or username input field is not defined", (done) => {
    request.post(signinRoute)
      .send({
        "emailUsername": "",
        "password": "asdfghj",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("email or username required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if password input field is not defined", (done) => {
    request.post(signinRoute)
      .send({
        "emailUsername": "somebody",
        "password": "",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("password required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if emailUsername field has just white spaces", (done) => {
    request.post(signinRoute)
      .send({
        "emailUsername": "         ",
        "password": "asdfghj",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.be.a("string");
        expect(res.body.error).to.eql("email or username required");
        expect(res.body.status).to.be.a("number");
        should.not.exist(err);
        should.exist(res.body);
        (res.body).should.be.an("object");
        if (err) { return done(err); }
        done();
      });
  });

  it("should return 400 if if user doesn't exist on the database", (done) => {
    request.post(signinRoute)
      .send({
        "emailUsername": "iDontExist",
        "password": "xxxxxxxx",
      }).end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.error).to.eql("username/email or password doesn't exist");
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

