const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

router.post("/add-to-playlist", playlistController.addToPlaylist);

module.exports = router;
