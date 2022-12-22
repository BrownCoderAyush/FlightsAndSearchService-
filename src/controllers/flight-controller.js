const { flightService } = require('../service/index');

const FlightService = new flightService();

const create = async (req,res)=>{
    try {
        const flight = await FlightService.createFlight(req.body);
        return res.status(201).json({
            data:flight,
            success:true,
            err:{},
            message:'Successfully created a flight'
        });

    } catch (error) {
        console.log(error);
        console.log("hello");
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to create a flight",
            err: error
        })
    }
}

module.exports = {
    create
}