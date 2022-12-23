const AirportRepository = require('../repository/airport-repository');
const crudService = require('./crud-service');


class AirportService extends crudService     {
    constructor(){
        const airportRepositroy = new AirportRepository();
        super(airportRepositroy);
    }
}

module.exports = AirportService;