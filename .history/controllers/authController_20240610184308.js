const User = require("../models/User");
const Playlist = require("../models/playlist");

exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).send("Lỗi máy chủ");
    }
    if (!user) {
      return res.status(401).send("Sai tên đăng nhập hoặc mật khẩu");
    }

    // So sánh mật khẩu
    if (password !== user.password) {
      return res.status(401).send("Sai tên đăng nhập hoặc mật khẩu");
    }

    // Đăng nhập thành công, lưu thông tin người dùng vào session
    req.session.user = user;
    res.redirect("/home");
  });
};

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Kiểm tra xem người dùng đã tồn tại chưa
  User.findByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).send("Lỗi máy chủ");
    }
    if (user) {
      return res.status(400).send("Tài khoản đã tồn tại");
    }

    // Tạo người dùng mới
    const newUser = {
      username: username,
      password: password, // Cần hash mật khẩu trước khi lưu vào cơ sở dữ liệu
    };

    // Lưu người dùng vào cơ sở dữ liệu
    User.create(newUser, (err, result) => {
      if (err) {
        return res.status(500).send("Lỗi máy chủ");
      }
      // Chuyển hướng sang trang đăng nhập và gửi thông báo "Đăng ký thành công"
      res.redirect("/login?success=true");
    });
  });
};

function handleSuccessfulLogin(userId, res) {
  // Lưu user_id vào session
  saveUserIdToSession(userId);

  // Lấy và hiển thị danh sách phát từ bảng playlists
  fetchPlaylist(userId, res);
}

function saveUserIdToSession(userId) {
  // Lưu userId vào session
  // Thực hiện lưu trữ userId vào session ở đây
}

function fetchPlaylist(userId, res) {
  // Lấy danh sách phát từ cơ sở dữ liệu dựa trên userId
  Playlist.getPlaylistsByUserId(userId, (err, playlists) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách phát:", err);
      return res.status(500).send("Lỗi máy chủ");
    }
    // Xử lý kết quả và gửi về cho client
    res.json(playlists);
  });
}
