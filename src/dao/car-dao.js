const HttpError = require("../models/http-error");
const Car = require("../models/car");

const createCar = async (car) => {
  const newCar = new Car({
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
  });

  try {
    const savedCar = await newCar.save();
    return savedCar;
  } catch (err) {
    console.error(`Error creating car: ${err.message}`, err);
    throw new HttpError("Error creating car", 500);
  }
};

const getCars = async () => {
  try {
    const cars = await Car.find();
    return cars;
  } catch (err) {
    console.error(`Error fetching cars: ${err.message}`, err);
    throw new HttpError("Error fetching cars", 500);
  }
};

const getCarById = async (carId) => {
  try {
    const car = await Car.findById(carId);
    if (!car) {
      throw new HttpError("Car not found", 404);
    }
    return car;
  } catch (err) {
    console.error(`Error fetching car: ${err.message}`, err);
    throw new HttpError("Error fetching car", 500);
  }
};

const updateCar = async (newCarData, carId) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(carId, newCarData, { new: true });
    if (!updatedCar) {
      throw new HttpError("Car not found", 404);
    }
    return updatedCar;
  } catch (err) {
    console.error(`Error updating car: ${err.message}`, err);
    throw new HttpError("Error updating car", 500);
  }
};

const deleteCar = async (carId) => {
  try {
    const deletedCar = await Car.findByIdAndRemove(carId);
    if (!deletedCar) {
      throw new HttpError("Car not found", 404);
    }
    return { message: "Car deleted successfully." };
  } catch (err) {
    console.error(`Error deleting car: ${err.message}`, err);
    throw new HttpError("Error deleting car", 500);
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
