import { db } from "../database";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [username, firstname, lastname, othername, email, phoneNumber.toString().trim(), hash, false])
			.then(() => {
				db.any("SELECT * FROM users WHERE email = $1", [email])
					.then(data => {
						return res.status(201).json({
							status: 201,
							data
						});
					});
			});
	}
}


