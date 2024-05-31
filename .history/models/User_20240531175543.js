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
        callback(null, results[0]);
      }
    );
  }

  static create(newUser, callback) {
    db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [newUser.username, newUser.email, newUser.password],
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
