const HttpError = require("../models/http-error");
const User = require("../models/user");

const createUser = async (user) => {
  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error(`Error creating user: ${err.message}`, err);
    throw new HttpError("Error creating user", 500);
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.error(`Error fetching users: ${err.message}`, err);
    throw new HttpError("Error fetching users", 500);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return user;
  } catch (err) {
    console.error(`Error fetching user: ${err.message}`, err);
    throw new HttpError("Error fetching user", 500);
  }
};

const updateUser = async (newUserData, userId) => {
  try {
    const user = await User.findByIdAndUpdate(userId, newUserData, { new: true });
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return user;
  } catch (err) {
    console.error(`Error updating user: ${err.message}`, err);
    throw new HttpError("Error updating user", 500);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndRemove(userId);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return { message: "User deleted successfully." };
  } catch (err) {
    console.error(`Error deleting user: ${err.message}`, err);
    throw new HttpError("Error deleting user", 500);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
