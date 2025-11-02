// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { validateLogin } = require("../middleware/validation");

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", validateLogin, userController.loginVulnerable);
router.post("/password", validateLogin, userController.getPasswordByCredentials);

module.exports = router;
