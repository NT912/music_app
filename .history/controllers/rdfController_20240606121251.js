const RDFModel = require("../models/rdfModel");

class RDFController {
  constructor() {
    this.rdfModel = new RDFModel();
  }

  async search(req, res) {
    const keyword = req.query.query; // Thay đổi từ keyword thành query để phản ánh tên trường trong form

    try {
      const tracks = await this.rdfModel.searchTracksByKeyword(keyword);
      res.json({ tracks: tracks });
      // Trả về kết quả dưới dạng JSON
    } catch (error) {
      console.error("Lỗi khi tìm kiếm bài hát:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = RDFController;
