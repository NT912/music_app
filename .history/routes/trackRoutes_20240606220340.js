const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const multer = require("multer");
const path = require("path");
const { ensureAuthenticated } = require("../middleware/auth");

// Thiết lập multer để tải lên file âm nhạc vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post(
  "/add-song",
  upload.single("track_file"), // Sử dụng middleware upload.single() để xử lý tải lên file
  (req, res, next) => {
    // Tiếp tục sang controller để xử lý thông tin bài hát
    next();
  },
  trackController.addTrack
);

router.post(
  "/add-to-playlist",
  ensureAuthenticated,
  trackController.addToPlaylist
);

router.get("/user/playlist", ensureAuthenticated, trackController.getPlaylist);

module.exports = router;
