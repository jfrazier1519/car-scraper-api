const userServ = require("../services/user-serv");

const createUser = async (req, res, next) => {
  try {
    const { name, address } = req.body.store;
    const user = {
      name,
      address,
    };
    const result = await userServ.createUser(user);
    res.status(201).json({ user: result });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await userServ.getUsers();
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userServ.getUserById(userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
    try {
        const newUserData = req.body;
        const userId = req.params.id;
        const updatedUser = await userServ.updateUser(newUserData, userId);
        res.json({ updatedUser });
      } catch (error) {
        next(error);
      }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await userServ.deleteUser(userId);
    res.status(200).json({ message: "Deleted user successfully. " });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
