const express = require("express");
const CityController = require("../../controllers/city-controller");
const FlightController = require("../../controllers/flight-controller");
const AirportController = require("../../controllers/airport-controller");
const {FlightMiddlewares} = require('../../middlewares/index');


const router = express.Router();

router.post('/city' , CityController.create);
router.delete('/city/:id',CityController.destory);
router.get('/city/:id',CityController.get);
router.get('/city',CityController.getAll);
router.get('/city/airports/:id' , CityController.getAirports);
router.patch('/city/:id',CityController.update);


router.post('/flights' , FlightMiddlewares.validateCreateFlight , FlightController.create);
router.get('/flights' , FlightController.getAll);
router.get('/flights/:id' , FlightController.getFlight);


router.post('/airports' , AirportController.create);




module.exports = router;