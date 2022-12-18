const {CityRepository} = require("../repository/index");


class cityService {
    constructor(){
        this.cityRepository = new CityRepository();
    }
    async createCity(data){
        try {
            const city = await this.cityRepository.createCity(data);
            return city;     
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
        
    }
    async deleteCity(cityId){
        try {
            const response = await this.cityRepository.deleteCity(cityId);
            return response;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
    }
    async updateCity(cityId,data){
        try {
            const response = await this.cityRepository.updateCity(cityId,data);
            return response;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
    }
    async getCity(cityId){
        try {
            const response = await this.cityRepository.getCity(cityId);
            return response;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
    }
    async getAllCities(filter){
        try {
            const response = await this.cityRepository.getAllCities({name : filter.name});
            return response;
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw {error};
        }
    }
}

module.exports=cityService;