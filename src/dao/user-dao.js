const HttpError = require("../models/http-error");
const User = require("../models/user");
const logger = require("../middleware/logger");

const handleDBOperation = async (operation, errorMessage) => {
  try {
    return await operation;
  } catch (error) {
    logger.error(`${errorMessage}: ${error.message}`, error);
    throw new HttpError(errorMessage, 500);
  }
};

const createUser = async (user) => {
  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  return handleDBOperation(newUser.save(), 'Error creating user');
};

const getUsers = async () => {
  return handleDBOperation(User.find(), 'Error fetching users');
};

const getUserById = async (userId) => {
  const user = await handleDBOperation(User.findById(userId), 'Error fetching user');
  
  if (!user) {
    throw new HttpError("User not found", 404);
  }

  return user;
};

const updateUser = async (newUserData, userId) => {
  const user = await handleDBOperation(User.findByIdAndUpdate(userId, newUserData, { new: true }), 'Error updating user');

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  return user;
};

const deleteUser = async (userId) => {
  const user = await handleDBOperation(User.findByIdAndRemove(userId), 'Error deleting user');

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  return { message: "User deleted successfully." };
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
