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
  const trackId = req.params.id;

  Track.delete(trackId, (err) => {
    if (err) {
      console.error("Lỗi khi xóa bài hát:", err);
      return res
        .status(500)
        .send("Đã xảy ra lỗi khi xóa bài hát. Vui lòng thử lại sau.");
    }
    console.log("Xóa bài hát thành công:", trackId);
    res.status(200).send("Bài hát đã được xóa thành công");
  });
};

exports.search = (req, res) => {
  const query = req.query.q; // Lấy từ khóa tìm kiếm từ tham số truy vấn
  Track.search(query, (err, results) => {
    if (err) {
      console.error("Lỗi khi tìm kiếm:", err);
      res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm." });
    } else {
      res.json(results); // Trả về kết quả tìm kiếm dưới dạng JSON
    }
  });
};
