const HttpError = require("../models/http-error");
const Car = require("../models/car");
const logger = require("../middleware/logger");

const handleDBOperation = async (operation, errorMessage) => {
  try {
    return await operation;
  } catch (error) {
    logger.error(`${errorMessage}: ${error.message}`, error);
    throw new HttpError(errorMessage, 500);
  }
};

const createCar = async (car) => {
  const newCar = new Car({
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
  });

  return await handleDBOperation(newCar.save(), "Error creating car");
};

const getCars = async () => {
  return await handleDBOperation(Car.find(), "Error fetching cars");
};

const getCarById = async (carId) => {
  const car = await handleDBOperation(
    Car.findById(carId),
    "Error fetching car"
  );
  if (!car) {
    throw new HttpError("Car not found", 404);
  }
  return car;
};

const updateCar = async (newCarData, carId) => {
  const updatedCar = await handleDBOperation(
    Car.findByIdAndUpdate(carId, newCarData, { new: true }),
    "Error updating car"
  );
  if (!updatedCar) {
    throw new HttpError("Car not found", 404);
  }
  return updatedCar;
};

const deleteCar = async (carId) => {
  const deletedCar = await handleDBOperation(
    Car.findByIdAndRemove(carId),
    "Error deleting car"
  );
  if (!deletedCar) {
    throw new HttpError("Car not found", 404);
  }
  return { message: "Car deleted successfully." };
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
