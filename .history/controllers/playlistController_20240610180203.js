const Playlist = require("../models/playlist");

// Lấy danh sách phát của người dùng từ bảng playlists
exports.getPlaylistByUserId = (req, res) => {
  const userId = req.session.userId;

  Playlist.getPlaylistByUserId(userId, (err, playlist) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách phát:", err);
      res.status(500).json({ error: "Đã xảy ra lỗi khi lấy danh sách phát." });
    } else {
      res.json({ playlist: playlist });
    }
  });
};
