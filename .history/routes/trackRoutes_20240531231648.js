const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const multer = require("multer");
const path = require("path");

router.get("/fetch-tracks", trackController.fetchTracks);
router.post("/save-track", trackController.saveTrack);

router.post(
  "/add-song",
  (req, res, next) => {
    // Sử dụng multer để xử lý tải lên file âm nhạc
    upload(req, res, function (err) {
      if (err) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi tải lên file:", err);
        return res.status(500).send("Đã xảy ra lỗi khi tải lên file.");
      }
      // Tiếp tục sang controller để xử lý thông tin bài hát
      next();
    });
  },
  trackController.addTrack
);

module.exports = router;
