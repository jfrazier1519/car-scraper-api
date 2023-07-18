const express = require('express');
const UserController = require('../controllers/user-controller');

const router = express.Router();

router.post("/", UserController.createUser);

router.get("/", UserController.getUser);

router.patch("/", UserController.updateUser);

router.delete("/", UserController.deleteUser);

module.exports = router;
