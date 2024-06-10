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

  static delete(trackId, callback) {
    db.query("DELETE FROM tracks WHERE id = ?", [trackId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  }

  static search(query, callback) {
    const searchTerm = `%${query}%`; // Chuẩn bị từ khóa tìm kiếm
    db.query(
      "SELECT * FROM tracks WHERE track_name LIKE ? OR singer LIKE ?",
      [searchTerm, searchTerm],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      }
    );
  }
}

module.exports = Track;