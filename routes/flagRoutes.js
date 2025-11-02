const express = require("express");
const router = express.Router();
const flagController = require("../controllers/flagController");
const { validateUserId, validateFlag } = require("../middleware/validation");

router.post("/validate", [validateUserId, validateFlag], flagController.validateFlags);

module.exports = router;