const storeServ = require("../services/store-serv");
const { validateBody, validateId, storeSchema } = require('../middleware/validation');

const createStore = async (req, res, next) => {
  try {
    const store = validateBody(req.body, storeSchema);
    const result = await storeServ.createStore(store);
    res.status(201).json({ store: result });
  } catch (error) {
    next(error);
  }
};

const getStores = async (req, res, next) => {
  try {
    const stores = await storeServ.getStores();
    res.json({ stores });
  } catch (error) {
    next(error);
  }
};

const getStoreById = async (req, res, next) => {
  try {
    const storeId = validateId(req.params.id);
    const store = await storeServ.getStoreById(storeId);
    res.json({ store });
  } catch (error) {
    next(error);
  }
};

const updateStore = async (req, res, next) => {
  try {
    const store = validateBody(req.body, storeSchema);
    const storeId = validateId(req.params.id);
    const updatedStore = await storeServ.updateStore(store, storeId);
    res.json({ updatedStore });
  } catch (error) {
    next(error);
  }
};

const deleteStore = async (req, res, next) => {
  try {
    const storeId = validateId(req.params.id);
    await storeServ.deleteStore(storeId);
    res.status(200).json({ message: "Deleted store successfully. " });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};
