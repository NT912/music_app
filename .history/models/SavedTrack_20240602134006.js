const db = require("../config/db");

class SavedTrack {
  static add(trackId, userId, callback) {
    db.query(
      "INSERT INTO saved_tracks (id, id_user) VALUES (?, ?)",
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
