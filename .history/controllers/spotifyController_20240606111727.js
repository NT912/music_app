const spotifyApi = require("../models/spotifyModel");

exports.getTopTracks = async (req, res) => {
  try {
    const data = await spotifyApi.getPlaylistTracks("37i9dQZEVXbMDoHDwVN2tF"); // ID của playlist bảng xếp hạng
    res.json(data.body);
  } catch (error) {
    res.status(500).send(error);
  }
};
