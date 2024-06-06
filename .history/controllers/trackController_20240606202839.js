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

// Lấy danh sách phát của người dùng
exports.getUserPlaylist = async (req, res) => {
  try {
    const userId = req.user._id; // Giả sử bạn đang sử dụng một hệ thống xác thực để lấy ID người dùng
    const tracks = await Track.find({ user: userId });
    res.status(200).json({ playlist: tracks });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách phát của người dùng" });
  }
};

// Thêm bài hát vào danh sách phát
exports.addToPlaylist = async (req, res) => {
  try {
    const userId = req.user._id; // Giả sử bạn đang sử dụng một hệ thống xác thực để lấy ID người dùng
    const { trackName, singer, trackPath } = req.body;

    const newTrack = new Track({
      user: userId,
      trackName,
      singer,
      trackPath,
    });

    await newTrack.save();
    res
      .status(200)
      .json({ message: "Đã thêm bài hát vào danh sách phát", track: newTrack });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi thêm bài hát vào danh sách phát" });
  }
};
