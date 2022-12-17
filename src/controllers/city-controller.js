const { cityService } = require("../service/index");

const CityService = new cityService();
/*
POST
*/
const create = async (req , res)=>{
    try {
        const city = await CityService.createCity(req.body);
        return res.status(201).json({
            data : city , 
            success : true,
            message : "Successfully created a city",
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {} , 
            success : false,
            message : "not able to created a city",
            err : error
        })
    }
} 
/*
DELETE
url -> city/:id
*/
const destory = async(req,res)=>{
    try {
        const response = await CityService.deleteCity(req.params.id);
        return res.status(201).json({
            data : response , 
            success : true,
            message : "Successfully deleted a city",
            err : {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {} , 
            success : false,
            message : "Not able to delete a city",
            err : error
        })
    }
}
/*
GET
url -> city/:id
*/
const get = async (req,res)=>{
        try {
            const response = CityService.getCity(req.body.id);
            return res.status(201).json({
                data : response , 
                success : true,
                message : "Successfully fetched a city",
                err : {}
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data : {} , 
                success : false,
                message : "Not able to fetch a city",
                err : error
            })
        }
}

/**
    PATCH
    url -> city/:id , req.body 
 */
const update = async (req,res)=>{
    try {
        const response = CityService.updateCity(req.params.id , req.body );
        return res.status(201).json({
            data : response , 
            success : true,
            message : "Successfully updated a city",
            err : {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data : {} , 
            success : false,
            message : "Not able to update a city",
            err : error
        })
    }
}

module.exports = {
    create,get,update,destory
}