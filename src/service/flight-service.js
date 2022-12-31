const {FlightRepository,AirplaneRepository} = require('../repository/index');
const {comapareTime} = require('../utils/helper');


class FlightService{
    constructor(){
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }
    async createFlight(data){
        if(!comapareTime(data.arrivalTime,data.departureTime)){
            throw { error: 'Arrival time cannot be less than departure time '}
        }
        try {
             const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({...data , totalSeats : airplane.capacity });
            return flight;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
    }
    async getAllflightData(data){
        try {
            const flights = await this.flightRepository.getAllFlights(data);
            return flights;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
    }

    async getFlight(flightId){
        try {
            const flight = await this.flightRepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
    }
}

module.exports = FlightService;