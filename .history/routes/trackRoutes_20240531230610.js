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

// Thiết lập multer để tải lên file âm nhạc vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = router;
