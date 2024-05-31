exports.index = (req, res) => {
  res.render("index", { user: req.user });
};

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.registerPage = (req, res) => {
  res.render("register");
};
