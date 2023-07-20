const HttpError = require("../models/http-error");
const Store = require("../models/store");
const logger = require("../middleware/logger");

const handleDBOperation = async (operation, errorMessage) => {
  try {
    return await operation;
  } catch (error) {
    logger.error(`${errorMessage}: ${error.message}`, error);
    throw new HttpError(errorMessage, 500);
  }
};

const createStore = async (store) => {
  const newStore = new Store({
    name: store.name,
    address: store.address,
  });

  return await handleDBOperation(newStore.save(), "Error creating store");
};

const getStores = async () => {
  return await handleDBOperation(Store.find(), "Error fetching stores");
};

const getStoreById = async (storeId) => {
  const store = await handleDBOperation(
    Store.findById(storeId),
    "Error fetching store"
  );
  if (!store) {
    throw new HttpError("Store not found", 404);
  }
  return store;
};

const updateStore = async (newStoreData, storeId) => {
  const updatedStore = await handleDBOperation(
    Store.findByIdAndUpdate(storeId, newStoreData, { new: true }),
    "Error updating store"
  );
  if (!updatedStore) {
    throw new HttpError("Store not found", 404);
  }
  return updatedStore;
};

const deleteStore = async (storeId) => {
  const deletedStore = await handleDBOperation(
    Store.findByIdAndRemove(storeId),
    "Error deleting store"
  );
  if (!deletedStore) {
    throw new HttpError("Store not found", 404);
  }
  return { message: "Store deleted successfully." };
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};
