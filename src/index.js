const express = require("express");
const bodyParser = require("body-parser");


const {PORT} = require("./config/serverConfig");
const ApiRoutes = require('./routes/index');
const db = require('./models/index');

// for temporary purpose 
const CityRepository = require('./repository/city-repository');
const {cityService} = require('./service/index')
const {Airport , City  , Flights } = require('./models/index');


const setupAndStartServer = async ()=>{
    // create express object
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api' , ApiRoutes);
    
    app.listen( PORT, async()=>{
        console.log(`Server started at ${PORT}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter:false});
        }
        // await Flights.create()
    })
}

setupAndStartServer();