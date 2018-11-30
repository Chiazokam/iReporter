import { db } from "../database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Helpers } from "../helpers";

const trim = new Helpers();

dotenv.load();

export class Users {
	/**
   * Represents signup user
   * @param { object } req - request body
   * @param { object } res - response body
   */
	createNewUsers(req, res) {
		const { username, firstname, lastname, othername, phoneNumber, email, password } = req.body;

		const hash = bcrypt.hashSync(password, 10);

		db.none("INSERT INTO users(username, firstname, lastname, othername, email, phoneNumber, password, isAdmin)" +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [trim.trimMe(username), trim.trimMe(firstname), trim.trimMe(lastname), trim.trimMe(othername), trim.trimMe(email), trim.trimMe(phoneNumber), hash, false])
			.then(() => {
				db.any("SELECT * FROM users WHERE email = $1", [email])
					.then(data => {
						const user = data[0];
						const token = jwt.sign({
							id: user.id,
							email: user.email,
							firstname: user.firstname,
							lastname: user.lastname,
							phoneNumber: user.phoneNumber,
							isAdmin: user.isAdmin,
						}, process.env.SECRET_KEY, { expiresIn: "1d" });
						Helpers.returnForSigninSignUp(req, res, 201, token, "User created successfully");
					});
			});
	}


	/**
   * Method to login users
   * @param { object } req - body request
   * @param { object } res - body response
   */
	signinUser(req, res) {
		const { emailUsername, password } = req.body;
		db.any("SELECT * FROM users WHERE email = $1 OR username = $2", [trim.trimMe(emailUsername), trim.trimMe(emailUsername)])
			.then(data => {
				const user = data[0];
				if (data.length > 0) {
					bcrypt.compare(password, user.password, (error, result) => {
						if (!result) {
							Helpers.returnForError(req, res, 400, "password incorrect");
						}
						else {
							const token = jwt.sign({
								id: user.id,
								email: user.email,
								firstname: user.firstname,
								lastname: user.lastname,
								phoneNumber: user.phoneNumber,
								isAdmin: user.isAdmin,
							}, process.env.SECRET_KEY, { expiresIn: "1d" });
							Helpers.returnForSigninSignUp(req, res, 200, token, "signin successful");
						}
					});
				} else {
					Helpers.returnForError(req, res, 400, "User doesn't exist");
				}
			});
	}



}





