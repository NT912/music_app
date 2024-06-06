const express = require("express");
const router = express.Router();
const RDFController = require("../controllers/rdfController");

const rdfController = new RDFController();

router.get("/search", (req, res) => {
  rdfController.search(req, res);
});

module.exports = router;
