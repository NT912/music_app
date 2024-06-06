const Track = require("../models/track");
const Search = require("../models/search");

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

exports.search = (req, res) => {
  const keyword = req.query.q;
  if (!keyword) {
    return res.status(400).send("Từ khóa tìm kiếm không được để trống");
  }

  Search.search(keyword)
    .then((results) => {
      res.render("search", { results, keyword });
    })
    .catch((err) => {
      console.error("Lỗi khi tìm kiếm:", err);
      res.status(500).send("Đã xảy ra lỗi khi tìm kiếm");
    });
};
