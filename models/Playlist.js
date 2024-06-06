const db = require("../config/db");

class Playlist {
  static getAllByUserId(userId, callback) {
    const query = "SELECT * FROM playlists WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }
}

module.exports = Playlist;
