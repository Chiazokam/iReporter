import { db } from "./db";
import bcrypt from "bcryptjs";

const password = "asdf;lkj";
const hash = bcrypt.hashSync(password, 10);

export const polulateDB = () => {
	db.tx(t => {
		return t.batch([
			t.none("INSERT INTO users(username, firstname, lastname, othername, email, phoneNumber, password, isAdmin)" +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", ["johnny", "Doe", "John", "", "johndoe@yahoo.com", "07018273648", hash, true]),
			t.none("INSERT INTO users(username, firstname, lastname, othername, email, phoneNumber, password, isAdmin)" +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", ["just", "Justice", "John", "", "jj@gmail.com", "08087573123", hash, true]),
			t.none("INSERT INTO users(username, firstname, lastname, othername, email, phoneNumber, password, isAdmin)" +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", ["shaolinmkz", "Chukwuemeka", "Nwabuzor", "Obiora", "nwabuzor.obiora@gmail.com", "07067443245", hash, true]),
			t.none("INSERT INTO incidents(title, comment, type, location, images, videos, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", ["Armed robbers located living in ABC", "It all started when the earth rumbled...", "red-flag", "12.233334, 2.323123", "http://jamaica-star.com/sites/default/files/styles/460px/public/media/article_images/2017/11/21/BadroadsA20171121RM.jpg?itok=K72fUdU5", "https://youtu.be/bPYbg-nrWzg", "draft", 1]),
			t.none("INSERT INTO incidents(title, comment, type, location, images, videos, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", ["People are suffering from mal-nutrition", "It all started when the earth rumbled...", "intervention", "12.233334, 2.323123", "http://jamaica-star.com/sites/default/files/styles/460px/public/media/article_images/2017/11/21/BadroadsA20171121RM.jpg?itok=K72fUdU5", "https://youtu.be/bPYbg-nrWzg", "draft", 2]),
      t.none("INSERT INTO incidents(title, comment, type, location, images, videos, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", ["Murder In XYZ town", "It all started when the earth rumbled...", "red-flag", "12.233334, 2.323123", "http://jamaica-star.com/sites/default/files/styles/460px/public/media/article_images/2017/11/21/BadroadsA20171121RM.jpg?itok=K72fUdU5", "https://youtu.be/bPYbg-nrWzg", "draft", 2]),
		]);
	});
};



