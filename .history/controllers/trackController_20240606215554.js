const Track = require("../models/track");
const Playlist = require("../models/Playlist");

exports.addTrack = (req, res) => {
  // Lưu thông tin bài hát vào cơ sở dữ liệu
  const trackName = req.body["track_name"];
  const singer = req.body.singer;
  const trackPath = req.file.path;

  const newTrack = {
    track_name: trackName,
    singer: singer,
    tracks_path: trackPath,
  };

  Track.create(newTrack, (err, trackId) => {
    if (err) {
      console.error("Lỗi khi lưu bài hát:", err);
      res
        .status(500)
        .send("Đã xảy ra lỗi khi lưu bài hát. Vui lòng thử lại sau.");
    } else {
      console.log("Thêm bài hát thành công:", trackId);
      // Phản hồi thành công với client
      res.status(200).send("Bài hát đã được thêm thành công");
    }
  });
};

exports.addToPlaylist = (req, res) => {
  const userId = req.user.id; // Assumes user is added to req by authentication middleware
  const trackId = req.body.trackId;

  Playlist.addTrackToPlaylist(userId, trackId, (err) => {
    if (err) {
      console.error("Lỗi khi thêm bài hát vào danh sách phát:", err);
      res
        .status(500)
        .send(
          "Đã xảy ra lỗi khi thêm bài hát vào danh sách phát. Vui lòng thử lại sau."
        );
    } else {
      res.status(200).send("Bài hát đã được thêm vào danh sách phát");
    }
  });
};

exports.getPlaylist = (req, res) => {
  const userId = req.user.id; // Assumes user is added to req by authentication middleware

  Playlist.getPlaylistByUserId(userId, (err, playlist) => {
    if (err) {
      console.error("Lỗi khi lấy danh sách phát:", err);
      res
        .status(500)
        .send("Đã xảy ra lỗi khi lấy danh sách phát. Vui lòng thử lại sau.");
    } else {
      const trackIds = playlist.map((item) => item.track_id);
      if (trackIds.length === 0) {
        return res.json({ playlist: [] });
      }

      Track.getByIds(trackIds, (err, tracks) => {
        if (err) {
          console.error("Lỗi khi lấy thông tin bài hát:", err);
          res
            .status(500)
            .send(
              "Đã xảy ra lỗi khi lấy thông tin bài hát. Vui lòng thử lại sau."
            );
        } else {
          res.json({ playlist: tracks });
        }
      });
    }
  });
};
