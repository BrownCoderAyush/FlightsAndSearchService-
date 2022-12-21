const {Flights} = require('../models/index');

class FlightRepositroy{
    async createFlight(data){
        try {
            const flight = await Flights.create(data);
            return flight;  
        } catch (error) {
            console.log("Something went wrong in the repository layer , here");
            throw {error};
        }
    }
}
module.exports = FlightRepositroy; 