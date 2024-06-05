const Track = require("../models/track");
const SavedTrack = require("../models/SavedTrack");

exports.addTrack = (req, res) => {
  console.log("Received request to add track:", req.body, req.file);

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

exports.saveTrack = (req, res) => {
  const { trackId } = req.body;
  const userId = req.session.user.id;

  // Kiểm tra xem bài hát đã được lưu trước đó chưa
  SavedTrack.findByTrackAndUser(trackId, userId, (err, savedTrack) => {
    if (err) {
      return res.status(500).send("Lỗi máy chủ");
    }
    if (savedTrack) {
      return res.status(400).send("Bài hát đã được lưu");
    }

    // Lưu bài hát vào danh sách của người dùng
    SavedTrack.add(trackId, userId, (err, result) => {
      if (err) {
        return res.status(500).send("Lỗi máy chủ");
      }
      res.status(200).send("Bài hát đã được lưu");
    });
  });
};
