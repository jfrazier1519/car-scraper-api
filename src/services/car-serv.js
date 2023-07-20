const carDao = require("../dao/car-dao");

const createCar = async (car) => {
  const createdCar = await carDao.createCar(car);
  return createdCar;
};

const getCars = async () => {
  const cars = await carDao.getCars();
  return cars;
};

const getCarById = async (carId) => {
  const car = await carDao.getCarById(carId);
  return car;
};

const updateCar = async (newCarData, carId) => {
  const updatedCar = await carDao.updateCar(newCarData, carId);
  return updatedCar;
};

const deleteCar = async (carId) => {
  const result = await carDao.deleteCar(carId);
  return result;
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
