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
}

module.exports = User;
