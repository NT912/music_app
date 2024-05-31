const db = require("../config/db");

class Track {
  static getAll(callback) {
    db.query("SELECT * FROM tracks", (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }

  static create(newTrack, callback) {
    db.query("INSERT INTO tracks SET ?", newTrack, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results.insertId);
    });
  }
}
}

module.exports = Track;
