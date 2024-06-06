const Track = require("../models/track");

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

exports.renderHomePage = (req, res) => {
  Track.getAll((error, tracks) => {
    if (error) {
      return res.status(500).send("An error occurred");
    }
    res.render("home", { playlists: playlists });
  });
};
