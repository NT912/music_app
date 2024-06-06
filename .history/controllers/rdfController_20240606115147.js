const RDFModel = require("../models/rdfModel");

class RDFController {
  constructor() {
    this.rdfModel = new RDFModel();
  }

  async search(req, res) {
    const keyword = req.query.keyword;

    try {
      const tracks = await this.rdfModel.searchTracksByKeyword(keyword);
      res.render("searchResults", { tracks });
    } catch (error) {
      console.error("Error searching tracks:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = RDFController;
