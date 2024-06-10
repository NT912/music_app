const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const multer = require("multer");
const path = require("path");

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

router.delete("/delete-song", trackController.deleteTrack);

module.exports = router;
