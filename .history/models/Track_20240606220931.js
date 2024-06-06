const db = require("../config/db");

// Thêm track vào cơ sở dữ liệu
exports.addTrack = (track, callback) => {
  const query =
    "INSERT INTO tracks (track_name, singer, album, genre, track_file) VALUES (?, ?, ?, ?, ?)";
  const values = [
    track.track_name,
    track.singer,
    track.album,
    track.genre,
    track.track_file,
  ];
  db.query(query, values, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Thêm track vào playlist
exports.addToPlaylist = (userId, trackId, callback) => {
  const query = "INSERT INTO playlist (user_id, track_id) VALUES (?, ?)";
  db.query(query, [userId, trackId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Lấy danh sách playlist của người dùng
exports.getPlaylist = (userId, callback) => {
  const query = `
    SELECT tracks.track_name, tracks.singer
    FROM playlist
    JOIN tracks ON playlist.track_id = tracks.id
    WHERE playlist.user_id = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};
