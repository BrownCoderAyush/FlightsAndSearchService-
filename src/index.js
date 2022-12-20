const express = require("express");
const bodyParser = require("body-parser");


const {PORT} = require("./config/serverConfig");
const ApiRoutes = require('./routes/index');
const db = require('./models/index');
const {Airport , City } = require('./models/index');


const setupAndStartServer = async ()=>{
    // create express object
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api' , ApiRoutes);
    
    app.listen( PORT, async()=>{
        console.log(`Server started at ${PORT}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter:true});
        }
        // const city = await City.findOne({
        //     where : {
        //         id : 6
        //     }
        // })
        
        // const response = await city.getAirports();

        // const Airports = await Airport.findAll({
        //     where : {
        //         cityId : 6 
        //     }
        // })
        // const Airports = await Airport.findAll({
        //     include:[{
        //         model: City
        //     }]
        // }); 


         
        // console.log(Airports);
    })
}

setupAndStartServer();