const userDao = require("../dao/user-dao");

const createUser = async (user) => {
  const createdUser = await userDao.createUser(user);
  return createdUser;
};

const getUsers = async () => {
  const users = await userDao.getUsers();
  return users;
};

const getUserById = async (userId) => {
    const user = await userDao.getUserById(userId);
    return user;
};

const updateUser = async (newUserData, userId) => {
    const updatedUser = await userDao.updateUser(newUserData, userId)
    return updatedUser;
};

const deleteUser = async (userId) => {
    const result = await userDao.deleteUser(userId);
    return result;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
