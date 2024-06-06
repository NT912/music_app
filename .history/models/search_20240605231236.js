const db = require("../config/db");

exports.searchTracksAndArtists = (query, callback) => {
  const queryString = `
    SELECT track_name, singer
    FROM tracks
    WHERE LOWER(track_name) LIKE '%${query}%' OR LOWER(singer) LIKE '%${query}%';
  `;
  db.query(queryString, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
