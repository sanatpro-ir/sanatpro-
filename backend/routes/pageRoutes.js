const express = require("express");
const router = express.Router();

const {
  getPage
} = require("../controllers/pageController");


router.get("/:page", getPage);


module.exports = router;