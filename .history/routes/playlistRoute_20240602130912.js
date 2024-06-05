const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

// Route để thêm bài hát vào danh sách phát của người dùng
router.post("/tracks/add-to-playlist", playlistController.addToPlaylist);

// Route để lấy danh sách phát của người dùng
router.get("/user/playlist", playlistController.getUserPlaylist);

module.exports = router;
