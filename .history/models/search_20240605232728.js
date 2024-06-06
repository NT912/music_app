// models/search.js
const db = require("../utils/database");

class Search {
  // Tìm kiếm bài hát hoặc ca sĩ theo từ khóa
  static search(keyword) {
    return new Promise((resolve, reject) => {
      // Sử dụng truy vấn SQL để tìm kiếm bài hát hoặc ca sĩ
      const sql = `SELECT * FROM tracks WHERE track_name LIKE '%${keyword}%' OR singer LIKE '%${keyword}%'`;

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Search;
