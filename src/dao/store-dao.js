const HttpError = require("../models/http-error");
const Store = require("../models/store");

const createStore = async (store) => {
  const newStore = new Store({
    name: store.name,
    address: store.address,
  });

  try {
    const savedStore = await newStore.save();
    return savedStore;
  } catch (err) {
    console.error(`Error creating store: ${err.message}`, err);
    throw new HttpError("Error creating store", 500);
  }
};

const getStores = async () => {
  try {
    const stores = await Store.find();
    return stores;
  } catch (err) {
    console.error(`Error fetching stores: ${err.message}`, err);
    throw new HttpError("Error fetching stores", 500);
  }
};

const getStoreById = async (storeId) => {
  try {
    const store = await Store.findById(storeId);
    if (!store) {
      throw new HttpError("Store not found", 404);
    }
    return store;
  } catch (err) {
    console.error(`Error fetching store: ${err.message}`, err);
    throw new HttpError("Error fetching store", 500);
  }
};

const updateStore = async (newStoreData, storeId) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(storeId, newStoreData, { new: true });
    if (!updatedStore) {
      throw new HttpError("Store not found", 404);
    }
    return updatedStore;
  } catch (err) {
    console.error(`Error updating store: ${err.message}`, err);
    throw new HttpError("Error updating store", 500);
  }
};

const deleteStore = async (storeId) => {
  try {
    const deletedStore = await Store.findByIdAndRemove(storeId);
    if (!deletedStore) {
      throw new HttpError("Store not found", 404);
    }
    return { message: "Store deleted successfully." };
  } catch (err) {
    console.error(`Error deleting store: ${err.message}`, err);
    throw new HttpError("Error deleting store", 500);
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};
