const Track = require("../models/track");
const SavedTrack = require("../models/SavedTrack");

exports.addTrack = (req, res) => {
  // Lưu thông tin bài hát vào cơ sở dữ liệu
  const trackName = req.body["track-name"];
  const singer = req.body.singer;
  const trackPath = req.file.path;

  const newTrack = {
    track_name: trackName,
    singer: singer,
    tracks_path: trackPath,
  };

  Track.create(newTrack, (err, trackId) => {
    if (err) {
      console.error("Lỗi khi lưu bài hát:", err);
      res
        .status(500)
        .send("Đã xảy ra lỗi khi lưu bài hát. Vui lòng thử lại sau.");
    } else {
      console.log("Thêm bài hát thành công:", trackId);
      // Phản hồi thành công với client
      res.status(200).send("Bài hát đã được thêm thành công");
    }
  });
};

exports.removeTrack = (req, res) => {
  const trackId = req.params.trackId;
  const userId = req.session.user.id;

  SavedTrack.remove(trackId, userId, (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    } else {
      res.json({ success: true, message: "Bài hát đã được xóa khỏi danh sách phát" });
    }
  });
