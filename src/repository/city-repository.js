const {Op} = require("sequelize");
const {City , Airport} = require("../models/index");

class CityRepository {
    async createCity({name}){
        try{
            const city = await City.create({name});
            return city;
        }catch(error){
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }
    
    async deleteCity(cityId){
        try {
            console.log(cityId , "hello");
            const response = await City.destroy({
                where:{
                    id:cityId
                }
            })
            return response;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }
    async updateCity(cityId , data){
        try {
            // const city = await City.update(data,{
            //     where:{
            //         id : cityId
            //     }
            // })
            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save();
            return city;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }

    async getCity(id){
        try {
            const city = await City.findByPk(id);
           return city;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
            
        }
    }
    async getAllCities(filter){
        try {
            if(filter.name){
                const response = await City.findAll({
                    where : {
                        name :{
                            [Op.startsWith]: filter.name
                        }
                    }

                })
                return response;
            }
            const response = await City.findAll();
            return response;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }
    
    async airportsOfCity(id){
        try {
            const city = await this.getCity(id);
            const airports = await city.getAirports();
            return airports;          
        } catch (error) {      
            console.log("something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = CityRepository;