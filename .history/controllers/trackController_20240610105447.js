const Track = require("../models/track");

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

exports.deleteTrack = (req, res) => {
  const trackPath = req.body.trackPath;

  Track.delete(trackPath, (err, result) => {
    if (err) {
      console.error("Lỗi khi xóa bài hát:", err);
      res
        .status(500)
        .send({ success: false, message: "Đã xảy ra lỗi khi xóa bài hát" });
    } else {
      console.log("Xóa bài hát thành công:", trackPath);
      res
        .status(200)
        .send({ success: true, message: "Bài hát đã được xóa thành công" });
    }
  });
};
