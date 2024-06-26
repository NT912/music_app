exports.index = (req, res) => {
  res.render("index");
};

exports.home = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("home", { user: req.session.user });
};

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.registerPage = (req, res) => {
  res.render("register", { success: req.query.success === "true" });
};

exports.logout = (req, res) => {
  // Xóa session (ví dụ cho Express.js)
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
