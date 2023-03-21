const { ClientErrorCodes } = require('../utils/error/error-codes');
const {StatusCodes} = require('http-status-codes');
const {AppError} = require('../utils/error/index.js');
const validateCreateFlight = (req, res, next) => {
    if(
        !req.body.flightNumber ||
        !req.body.airplaneId ||
        !req.body.departureAirportId ||
        !req.body.arrivalAirportId ||
        !req.body.arrivalTime || 
        !req.body.departureTime || 
        !req.body.price
    ) {
        // if any of the body params is missing we come inside the if
        return res.status(ClientErrorCodes.BAD_REQUEST).json({
            data: {},
            success: false,
            message: 'Invalid request body for create flight',
            err: new AppError('Inappropriate details'
                             ,'Cannot validate details',
                              ['Check weahter the input fields are empty or not'],
                                StatusCodes.INTERNAL_SERVER_ERROR
                              )
        });
    }

    next();
}


module.exports = {
    validateCreateFlight
}