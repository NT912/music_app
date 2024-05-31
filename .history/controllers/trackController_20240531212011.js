const Track = require("../models/Track");
const SavedTrack = require("../models/SavedTrack");

exports.addTrack;

exports.fetchTracks = (req, res) => {
  Track.getAll((err, tracks) => {
    if (err) {
      return res.status(500).send("Lỗi máy chủ");
    }
    res.status(200).json(tracks);
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
