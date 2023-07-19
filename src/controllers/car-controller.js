const carServ = require('../services/car-serv');

const createCar = async (req, res, next) => {
    try {
        const { name, address } = req.body.car;
        const car = {
          name,
          address,
        };
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
        const carId = req.params.id;
        const car = await carServ.getCarById(carId);
        res.json({ car });
      } catch (error) {
        next(error);
      }
    };

const updateCar = async (req, res, next) => {
    try {
        const newCarData = req.body;
        const carId = req.params.id;
        const updatedCar = await carServ.updateCar(newCarData, carId);
        res.json({ updatedCar });
      } catch (error) {
        next(error);
      }
    };

const deleteCar = async (req, res, next) => {
    const carId = req.params.id;
    try {
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
}