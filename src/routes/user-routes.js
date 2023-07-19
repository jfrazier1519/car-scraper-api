const express = require('express');
const UserController = require('../controllers/user-controller');

const router = express.Router();

router.route('/')
  .post(UserController.createUser)
  .get(UserController.getUsers);

router.route('/:id')
  .get(UserController.getUserById)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;