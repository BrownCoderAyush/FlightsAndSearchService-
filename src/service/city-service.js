const {CityRepository} = require("../repository/index");


class cityService {
    constructor(){
        this.cityRepository = new CityRepository();
    }
    async createCity({name}){
        try {
            const city = await this.cityRepository.createCity({name});
            return city;     
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
        
    }
    async deleteCity(cityId){
        try {
            const response = await this.cityRepository.deleteCity(cityId);
            return response;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }
    async updateCity(cityId,data){
        try {
            const response = await this.cityRepository.updateCity(cityId,data);
            return response;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }
    async getCity(cityId){
        try {
            const response = await this.cityRepository.getCity(cityId);
            return response;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports=cityService;