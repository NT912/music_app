const spotifyApi = require("../models/spotifyModel");

exports.getTopTracksPage = async (req, res) => {
  try {
    const data = await spotifyApi.getPlaylistTracks("37i9dQZEVXbMDoHDwVN2tF"); // ID của playlist bảng xếp hạng
    console.log(data); // Kiểm tra dữ liệu từ Spotify API
    const spotifyTracks = data.body.items.map((item) => ({
      track_name: item.track.name,
      singer: item.track.artists[0].name,
      tracks_path: item.track.external_urls.spotify, // hoặc item.track.preview_url nếu có
    }));

    const localTracks = []; // Thay bằng dữ liệu thực tế từ cơ sở dữ liệu của bạn

    const tracks = [...localTracks, ...spotifyTracks];

    console.log(tracks); // Kiểm tra danh sách track trước khi gửi đến view

    res.render("home", { tracks, user: req.user });
  } catch (error) {
    console.error(error); // In ra lỗi nếu có
    res.status(500).send(error);
  }
};
