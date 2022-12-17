const express = require("express");
const bodyParser = require("body-parser");

const {PORT} = require("./config/serverConfig");
// const cityService = require("./service/city-service");
// const {CityRepository} = require("./repository/index");
const cityService = require("./service/city-service");
const setupAndStartServer = async ()=>{
    // create express object
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


    app.listen( PORT, async()=>{
        console.log(`Server started at ${PORT}`);    
        const city = new cityService();
        city.createCity({name:"gawlior"});
    //    console.log(response);
    //    cityWork.deleteCity(1).then(response=>{
    //     console.log(response);
    //    });
        
    })
}

setupAndStartServer();