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

  static getById(trackId, callback) {
    db.query("SELECT * FROM tracks WHERE id = ?", [trackId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0]);
    });
  }

  static getAllByIds(trackIds, callback) {
    const query = "SELECT * FROM tracks WHERE id IN (?)";
    db.query(query, [trackIds], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }
}

exports.getPlaylist = (userId, callback) => {
  const query = "SELECT * FROM playlist WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = Track;
