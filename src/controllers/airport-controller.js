const {airportService} = require('../service/index')


const AirportService = new airportService();
const create = async (req,res)=>{
    try {
        const response = await AirportService.create(req.body);
        return res.status(201).json({
            data : response , 
            success : true,
            err : {} , 
            message : "Created a new airport"
        })
    } catch (error) {
        console.log(error , typeof error);
        return res.status(500).json({
            data : {} , 
            success : false,
            err : error , 
            message : "Cannot create a new airport"
        })
    }
}

module.exports = {
    create
}


