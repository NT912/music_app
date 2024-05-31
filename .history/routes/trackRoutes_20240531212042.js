const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const multer = require("multer");
const path = require("path");

router.get("/fetch-tracks", trackController.fetchTracks);
router.post("/save-track", trackController.saveTrack);

// Thiết lập multer để tải lên file âm nhạc vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Route xử lý khi người dùng gửi form thêm bài hát
router.post("/add-song", upload.single("track-file"), trackController.addTrack);

module.exports = router;
