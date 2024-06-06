const db = require("../config/db");

class Playlist {
  static addTrackToPlaylist(userId, trackId, callback) {
    db.query(
      "INSERT INTO playlists (user_id, track_id) VALUES (?, ?)",
      [userId, trackId],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results.insertId);
      }
    );
  }

  static getPlaylistByUserId(userId, callback) {
    db.query(
      "SELECT * FROM playlists WHERE user_id = ?",
      [userId],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      }
    );
  }
}

module.exports = Playlist;
