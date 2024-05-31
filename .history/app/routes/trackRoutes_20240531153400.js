const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");

router.get("/fetch-tracks", trackController.fetchTracks);
router.post("/save-track", trackController.saveTrack);

module.exports = router;
