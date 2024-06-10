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
    db.query(
      "INSERT INTO tracks (track_name, singer, tracks_path) VALUES (?, ?, ?)",
      [newTrack.track_name, newTrack.singer, newTrack.tracks_path],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results.insertId);
      }
    );
  }

  static delete(trackPath, callback) {
    console.log("Attempting to delete track with path:", trackPath);
    db.query(
      "DELETE FROM tracks WHERE tracks_path = ?",
      [trackPath],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        console.log("Deletion results:", results);
        callback(null, results.affectedRows);
      }
    );
  }
}

module.exports = Track;
