const Track = require("../models/track");
const Playlist = require("../models/Playlist");

exports.addTrack = (req, res) => {
  // Lưu thông tin bài hát vào cơ sở dữ liệu
  const trackName = req.body["track_name"];
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
