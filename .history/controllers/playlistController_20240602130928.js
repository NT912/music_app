const Playlist = require("../models/playlistModel");

exports.addToPlaylist = (req, res) => {
  const { user_id, trackName, singer, trackPath } = req.body;
  Playlist.addToPlaylist(
    user_id,
    trackName,
    singer,
    trackPath,
    (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm bài hát vào danh sách phát:", err);
        res
          .status(500)
          .json({
            message: "Đã xảy ra lỗi khi thêm bài hát vào danh sách phát",
          });
      } else {
        console.log("Bài hát đã được thêm vào danh sách phát");
        res.json({ message: "Bài hát đã được thêm vào danh sách phát" });
      }
    }
  );
};

exports.getUserPlaylist = (req, res) => {
  const user_id = req.user.id;
  Playlist.getUserPlaylist(user_id, (err, result) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách phát:", err);
      res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách phát" });
    } else {
      console.log("Danh sách phát đã được lấy thành công");
      res.json({ playlist: result });
    }
  });
};
