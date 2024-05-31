const db = require("../config/db");

class User {
  static findByUsername(username, callback) {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        if (results.length === 0) {
          return callback(null, null); // Trả về null nếu không tìm thấy người dùng
        }
        callback(null, results[0]);
      }
    );
  }

  static create(newUser, callback) {
    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [newUser.username, newUser.password],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      }
    );
  }
}

module.exports = User;
