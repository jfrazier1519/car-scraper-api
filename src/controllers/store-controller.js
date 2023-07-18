const storeServ = require("../services/store-serv");

const createStore = async (req, res, next) => {
  try {
    const { name, address } = req.body.store;
    const store = {
      name,
      address,
    };
    const result = await storeServ.createSchedule(store);
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
    const storeId = req.params.id;
    const store = await storeServ.getStoreById(storeId);
    res.json({ store });
  } catch (error) {
    next(error);
  }
};

const updateStore = async (req, res, next) => {
  try {
    const newStore = req.body;
    const storeId = req.params.id;
    const updatedStore = await storeServ.updateStore(newStore, storeId);
    res.json({ updatedStore });
  } catch (error) {
    next(error);
  }
};

const deleteStore = async (req, res, next) => {
  const storeId = req.params.id;
  try {
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
