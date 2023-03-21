const { StatusCodes } = require('http-status-codes');
const { FlightRepository, AirplaneRepository } = require('../repository/index');
const { AppError } = require('../utils/error/index');
const { comapareTime } = require('../utils/helper');



class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }
    async createFlight(data) {
        if (!comapareTime(data.arrivalTime, data.departureTime)) {
            throw new AppError("Service Error",
                "Cannot create flight",
                "Arrival time cannot be less than departure time ",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
        try {
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            if (!airplane) throw { message: "Invalid airplaneId" }
            const flight = await this.flightRepository.createFlight({ ...data, totalSeats: airplane.capacity });
            return flight;
        } catch (error) {
            if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError' || error.name == 'RepositoryError')
                throw error;
            else new AppError("Service Error",
                "Cannot create flight",
                ["There was some issue creating the flight, please try again later"],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    async getAllflightData(data) {
        try {
            const flights = await this.flightRepository.getAllFlights(data);
            return flights;
        } catch (error) {
            console.log("something went wrong in the service layer");
            if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError' || error.name == 'RepositoryError')
                throw error;
            throw new AppError("Service Error",
                "Cannot get flight data",
                ["There was some issue getting All the flight data, please try again later"],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await this.flightRepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("something went wrong in the service layer");
            if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError' || error.name == 'RepositoryError')
                throw error;
            throw new AppError("Service Error",
                "Cannot get flight data",
                ["There was some issue getting the flight by flight Id, please try again later"],
                StatusCodes.INTERNAL_SERVER_ERROR
            )

        }
    }

    async updateFlight(flightId, data) {
        try {
            const flight = await this.flightRepository.updateFlight(flightId, data);
            return flight;
        } catch (error) {
            console.log("something went wrong in the service layer");
            if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError' || error.name == 'RepositoryError')
                throw error;
            throw new AppError("Service Error",
                "Cannot update flight data",
                ["There was some issue updating the flight, please try again later"],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = FlightService;