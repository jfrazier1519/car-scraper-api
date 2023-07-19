const express = require('express');
const CarController = require('../controllers/car-controller');

const router = express.Router();

router.route('/')
  .post(CarController.createCar)
  .get(CarController.getCars);

router.route('/:id')
  .get(CarController.getCarById)
  .patch(CarController.updateCar)
  .delete(CarController.deleteCar);

module.exports = router;
