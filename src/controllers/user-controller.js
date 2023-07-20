const userServ = require("../services/user-serv");
const { validateBody, validateId, userSchema } = require("../middleware/validation");

const createUser = async (req, res, next) => {
  try {
    const user = validateBody(req.body, userSchema);
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
    const userId = validateId(req.params.id);
    const user = await userServ.getUserById(userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
    try {
        const newUserData = validateBody(req.body, userSchema);
        const userId = req.params.id;
        const updatedUser = await userServ.updateUser(newUserData, userId);
        res.json({ updatedUser });
      } catch (error) {
        next(error);
      }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = validateId(req.params.id);
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
