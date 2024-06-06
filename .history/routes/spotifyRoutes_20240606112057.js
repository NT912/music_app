const express = require("express");
const spotifyController = require("../controllers/spotifyController");
const router = express.Router();

router.get("/home", spotifyController.getTopTracksPage);

module.exports = router;
