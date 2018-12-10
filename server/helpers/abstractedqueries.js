import { Helpers } from "../helpers/predefinedMethods";
import { db } from "../database";

const strTrim = new Helpers();


export class Queries {

  /**
   * Creates a red-flag or intervention record
   * @param {object} createObject- body input request from user
   * @return {undefined}
   */
  createIncidentQuery(createObject){
    return db.any("INSERT INTO incidents(title, comment, type, location, images, videos, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [String(createObject.title).trim(), String(createObject.comment).trim(), strTrim.trimMe(createObject.type), String(createObject.location).trim(), createObject.images, createObject.videos, "draft", createObject.id]);
  }

  /**
   * Single argument select query statment
   * @param {string} tableName- database table
   * @param {string} unique_column - unique column
   * @return {undefined}
   */
  selectQuery(tableName, unique_column) {
    return db.any("SELECT * FROM "+ tableName +" ($1)",[unique_column]);
  }



}
