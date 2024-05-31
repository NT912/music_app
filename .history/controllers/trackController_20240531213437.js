const Track = require("../models/Track");
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

  // Thực hiện lưu thông tin bài hát vào cơ sở dữ liệu ở đây

  // Sau khi lưu thành công, chuyển hướng người dùng về trang home hoặc trang xác nhận
  res.redirect("/home");
};

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
