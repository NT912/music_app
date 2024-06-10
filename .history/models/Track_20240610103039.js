const db = require("../config/db");

class Track {
  static getAll(callback) {
    db.query("SELECT * FROM tracks", (err, results) => {
      console.log(err);
      if (err) {
        return callback(err);
      }
      console.log(results);
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

  exports.deleteTrack = (req, res) => {
    const trackPath = req.body.trackPath;

    Track.delete(trackPath, (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa bài hát:", err);
        res.status(500).send({ success: false, message: "Đã xảy ra lỗi khi xóa bài hát" });
      } else {
        console.log("Xóa bài hát thành công:", trackPath);
        res.status(200).send({ success: true, message: "Bài hát đã được xóa thành công" });
      }
    });
  };

}

module.exports = Track;
