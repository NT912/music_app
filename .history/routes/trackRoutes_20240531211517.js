const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const multer = require("multer");
const path = require("path");

router.get("/fetch-tracks", trackController.fetchTracks);
router.post("/save-track", trackController.saveTrack);

module.exports = router;
