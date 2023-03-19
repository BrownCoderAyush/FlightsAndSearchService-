const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    AUTH_SERVICE_PATH : process.env.AUTH_SERVICE_PATH
}