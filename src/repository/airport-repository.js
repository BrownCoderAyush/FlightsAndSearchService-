const {CrudRepository} = require('./index');
const  {Airport} = require('../models/index');

console.log(CrudRepository);

class AirportRepository extends CrudRepository{
    constructor(){
        super(Airport)
    }
}

module.exports = AirportRepository;
