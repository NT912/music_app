const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

router.get("/get-playlist", playlistController.getPlaylistByUserId);

module.exports = router;
