const storeDao = require("../dao/store-dao");

const createStore = async (store) => {
  const createdStore = await storeDao.createStore(store);
  return createdStore;
};

const getStores = async () => {
  const stores = await storeDao.getStores();
  return stores;
};

const getStoreById = async (storeId) => {
    const store = await storeDao.getStoreById(storeId);
    return store;
};

const updateStore = async (newStoreData, storeId) => {
    const updatedStore = await storeDao.updateStore(newStoreData, storeId)
    return updatedStore;
};

const deleteStore = async (storeId) => {
    const result = await storeDao.deleteStore(storeId);
    return result;
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};
