const db = require("../config/db");

class Playlist {
  static getUserPlaylist(userId, callback) {
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
