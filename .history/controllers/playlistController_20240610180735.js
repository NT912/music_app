const Playlist = require("../models/Playlist");

// Function to add a track to the playlist
exports.addToPlaylist = (req, res) => {
  const userId = req.session.userId;
  const { trackName, singer, trackPath } = req.body;

  // Create a new playlist entry
  const newTrack = {
    userId: userId,
    trackName: trackName,
    singer: singer,
    trackPath: trackPath,
  };

  // Add the track to the playlist
  Playlist.create(newTrack, (err, result) => {
    if (err) {
      console.error("Lỗi khi thêm bài hát vào danh sách phát:", err);
      return res
        .status(500)
        .send("Đã xảy ra lỗi khi thêm bài hát vào danh sách phát");
    }
    res.status(200).send("Bài hát đã được thêm vào danh sách phát thành công");
  });
};
