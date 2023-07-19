const express = require('express');
const StoreController = require('../controllers/store-controller');

const router = express.Router();

router.route('/')
  .post(StoreController.createStore)
  .get(StoreController.getStores);

router.route('/:id')
  .get(StoreController.getStoreById)
  .patch(StoreController.updateStore)
  .delete(StoreController.deleteStore);

module.exports = router;
