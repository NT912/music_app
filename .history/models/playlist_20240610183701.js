// Trong file model/playlist.js
const db = require("../config/db");

class Playlist {
  static addToPlaylist(userId, trackId, callback) {
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
      "SELECT tracks.* FROM playlists INNER JOIN tracks ON playlists.track_id = tracks.id WHERE playlists.user_id = ?",
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
