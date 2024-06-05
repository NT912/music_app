const db = require("../config/db");

class Playlist {
  constructor(user_id, trackName, singer, trackPath) {
    this.user_id = user_id;
    this.trackName = trackName;
    this.singer = singer;
    this.trackPath = trackPath;
  }

  static addToPlaylist(user_id, trackName, singer, trackPath, callback) {
    db.query(
      "INSERT INTO playlists (user_id, track_name, singer, track_path) VALUES (?, ?, ?, ?)",
      [user_id, trackName, singer, trackPath],
      callback
    );
  }

  static getUserPlaylist(user_id, callback) {
    db.query(
      "SELECT track_name, singer, track_path FROM playlists WHERE user_id = ?",
      [user_id],
      callback
    );
  }
}

module.exports = Playlist;
