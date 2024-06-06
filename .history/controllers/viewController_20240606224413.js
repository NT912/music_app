const Track = require("../models/track");
const Playlist = require("../models/playlist");

exports.index = (req, res) => {
  res.render("index");
};

exports.home = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  Track.getAll((err, tracks) => {
    if (err) {
      return res.status(500).send("Lỗi máy chủ");
    }
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].tracks_path =
        "http://localhost:3000/" + tracks[i].tracks_path.split("uploads/")[1];
    }
    res.render("home", { tracks: tracks, user: req.session.user });
  });
};

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.registerPage = (req, res) => {
  res.render("register", { success: req.query.success === "true" });
};

exports.logout = (req, res) => {
  // Xóa session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      // Xử lý lỗi nếu cần
    } else {
      // Chuyển hướng đến trang login sau khi đăng xuất thành công
      res.redirect("/login");
    }
  });
};

exports.home = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  Playlist.getAllByUserId(req.session.user.id, (err, playlists) => {
    if (err) {
      return res.status(500).send("Lỗi máy chủ");
    }
    // Lấy danh sách track_id từ danh sách phát
    const trackIds = playlists.map((playlist) => playlist.track_id);
    // Truy vấn danh sách bài hát dựa trên trackIds
    Track.getAllByIds(trackIds, (err, tracks) => {
      if (err) {
        return res.status(500).send("Lỗi máy chủ");
      }
      // Render mẫu EJS với danh sách bài hát và người dùng đã đăng nhập
      res.render("home", { tracks: tracks, user: req.session.user });
    });
  });
};
