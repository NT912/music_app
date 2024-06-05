const db = require("../config/db");

class SavedTrack {
  static add(trackId, userId, callback) {
    db.query(
      "INSERT INTO saved_tracks (id_track, id_user) VALUES (?, ?)",
      [trackId, userId],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      }
    );
  }

  static remove(trackId, userId, callback) {
    db.query(
      "DELETE FROM saved_tracks WHERE id_track = ? AND id_user = ?",
      [trackId, userId],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      }
    );
  }
}

module.exports = SavedTrack;
