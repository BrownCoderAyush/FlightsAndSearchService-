const axios = require('axios');

const isAuthenticated = async (req,res,next)=>{
    const token = req.headers['x-access-token'];
    console.log("token and its type" , token , typeof token);
    console.log(token);
    let data = {
        headers: {
            "x-access-token": token,
            "content-type": "application/json"
        }
    };
    const AuthAuthenticationURL = `http://localhost:3001/api/v1/isAuthenticated`;

    const response = await axios.get(AuthAuthenticationURL , data);

    console.log(response);

    next();
}

module.exports = {
    isAuthenticated
}