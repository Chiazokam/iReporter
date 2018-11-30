import express from "express";
import { Helpers } from "../helpers";
import { Users } from "../controllers";
import {
  multipleStringValidation, locationStringValidation, isDummyDbEmpty, isUser, isRedFlag,
  doesRedFlagRecordExist, doesSpecificRedFlagIdRecordExist, commentStringValidation
} from "../middlewares";


const users = new Users();

const userRoutes = express.Router();

/**SignUp User */
userRoutes.post("/signup", users.createNewUsers);



