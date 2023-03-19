const axios = require('axios');
const { AUTH_SERVICE_PATH } = require('../config/serverConfig');

const isAuthenticated = async (req,res,next)=>{
    const token = req.headers['x-access-token'];
    
    let data = {
        headers: {
            "x-access-token": token,
            "content-type": "application/json"
        }
    };
    try { 
        const AuthAuthenticationURL = `${AUTH_SERVICE_PATH}/api/v1/isAuthenticated`;    
        const response = await axios.get(AuthAuthenticationURL , data);
        // next();
    } catch (error) {

        return res.status(401).json({
            data: {},
            success: false,
            message: "Authentication error invalid or malformed token",
            err: error
        })

    }


    next();
}

module.exports = {
    isAuthenticated
}