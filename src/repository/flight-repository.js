const {Flights} = require('../models/index');
const {Op} = require('sequelize');
const {AppError , ValidationError } = require("../utils/error/index.js");
const {StatusCodes} = require('http-status-codes');
class FlightRepositroy{

    #createFilter(data){
        let filter = {};
        if(data.arrivalAirportId) {
            filter.arrivalAirportId = data.arrivalAirportId;
        }
        if(data.departureAirportId) {
            filter.departureAirportId = data.departureAirportId;
        }

        // if(data.minPrice && data.maxPrice) {
        //     Object.assign(filter, {
        //         [Op.and]: [
        //             { price: {[Op.lte]: data.maxPrice} }, 
        //             { price: {[Op.gte]: data.minPrice} }
        //         ]
        //     })
        // }
        let priceFilter = [];
        if(data.minPrice) {
            // Object.assign(filter, {price: {[Op.gte]: data.minPrice}});
            priceFilter.push({price: {[Op.gte]: data.minPrice}});
        }
        if(data.maxPrice) {
            // Object.assign(filter, {price: {[Op.lte]: data.maxPrice}});
            priceFilter.push({price: {[Op.lte]: data.maxPrice}});
        }
        Object.assign(filter, {[Op.and]: priceFilter});
        // Object.assign(filter, {[Op.and]: [{ price: {[Op.lte]: 7000} }, { price: {[Op.gte]: 4000} }]})
        console.log(filter);
        return filter;
    }



    async createFlight(data){
        try {
            const flight = await Flights.create(data);
            return flight;  
        } catch (error) {
            console.log("Something went wrong in the repository layer ");
            if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create flight',
                ['There was some issue creating the flight, please try again later'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getFlight(flightId){
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer ");
            throw new AppError(
                'RepositoryError',
                'Cannot get flight',
                ['There was some issue getting the flight, please try again later'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getAllFlights(filter){
        try {
            const filterObject = this.#createFilter(filter);
            const flights = await Flights.findAll({
                where:filterObject
            });
            return flights;
        } catch (error) {
            console.log("Something went wrong in the repository layer getAllflights");
            // throw {error};
            throw new AppError(
                'RepositoryError',
                'Cannot get All flights',
                ['There was some issue getting the flight, please try again later'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )

        }
    }

    async updateFlight(flightId , data){
        try {
            await Flights.update(data , {
                where : {
                    id : flightId
                }
            });
            return true;          
        } catch (error) {
            console.log("something went wrong in the repository layer while updating flight");
            throw new AppError(
                'RepositoryError',
                'Cannot update flight',
                ['There was some issue updating the flight, please try again later'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )

        }
    }
}
module.exports = FlightRepositroy; 


/**
 * filterObject = {
 *         arrivalAirportId : 2,
 *         departureAirportId : 4 , 
 *         price : {
 *                  [Op.gte]:4000
 *              } 
 * }
 */