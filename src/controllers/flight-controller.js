const { flightService } = require('../service/index');
const { SuccessCodes } = require('../utils/error-codes');
const FlightService = new flightService();

const create = async (req,res)=>{
    try {
        let flightRequestData = {
            flightNumber : req.body.flightNumber,
            airplaneId : req.body.airplaneId,
            departureAirportId : req.body.departureAirportId,
            arrivalAirportId : req.body.arrivalAirportId,
            arrivalTime : req.body.arrivalTime,
            departureTime : req.body.departureTime,
            boardingGate : req.body.boardingGate,
            price : req.body.price , 


        }
        const flight = await FlightService.createFlight(flightRequestData);
        return res.status(SuccessCodes.CREATED).json({
            data:flight,
            success:true,
            err:{},
            message:'Successfully created a flight'
        });

    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to create a flight",
            err: error
        })
    }
}
const getAll = async (req,res)=>{
    try {
        const response = await FlightService.getAllflightData(req.query);
        return res.status(SuccessCodes.CREATED).json({
            data:response,
            success:true,
            err:{},
            message:'Successfully able to fetch all flights based on data provided',
        });
    } catch (error) { 

        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch all flights based on data provided ",
            err: error
        })
    }
}

const getFlight = async (req,res)=>{
    try {
        const response = await FlightService.getFlight(req.params.id);
        return res.status(SuccessCodes.CREATED).json({
            data:response,
            success:true,
            err:{},
            message:'Successfully able to fetch flight based on data provided',
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Not able to fetch a flight based on data provided ",
            err: error
        })
    }
}

module.exports = {
    create , getAll , getFlight
}