const carServ = require('../services/car-serv');
const { validateBody, validateId, carSchema } = require('../middleware/validation');

const createCar = async (req, res, next) => {
  try {
    const car = validateBody(req.body, carSchema);
    const result = await carServ.createCar(car);
    res.status(201).json({ car: result });
  } catch (error) {
    next(error);
  }
};

const getCars = async (req, res, next) => {
  try {
    const cars = await carServ.getCars();
    res.json({ cars });
  } catch (error) {
    next(error);
  }
};

const getCarById = async (req, res, next) => {
  try {
    const carId = validateId(req.params.id);
    const car = await carServ.getCarById(carId);
    res.json({ car });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const car = validateBody(req.body, carSchema);
    const carId = validateId(req.params.id);
    const updatedCar = await carServ.updateCar(car, carId);
    res.json({ updatedCar });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const carId = validateId(req.params.id);
    await carServ.deleteCar(carId);
    res.status(200).json({ message: "Deleted car successfully. " });
  } catch (error) {
    next(error);
  }
};

module.exports = {
   createCar,
   getCars,
   getCarById,
   updateCar,
   deleteCar
};
