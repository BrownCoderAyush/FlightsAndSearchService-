# Welcome to Flights Service

## Project Setup
- clone the project on your local
- Execute `npm install` on the same path as of your root directory of teh downloaded project
- Create a `.env` file in the root directory and add the following environment variable
```
PORT=3000
SYNC_DB=true
AUTH_SERVICE_PATH='http://localhost:3001'
```

- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "Flights_Search_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

- Once you've added your db config as listed above, go to the src folder from your terminal and execute `npx sequelize db:create`
and then execute `npx sequelize db:migrate`

## Seeding files 
- to seed the data for seeding files in your MySQL db run following commands sequentially . 

   `npx sequelize-cli db:seed --seed 20221221102941-add-city.js`\
   `npx sequelize-cli db:seed --seed 20221219080935-add-airports.js`\
   `npx sequelize-cli db:seed --seed 20221220160705-add-airplanes.js`
   
# DB design 

  - Airplane table   
  - Flight  
  - Airport
  - City 


- A flight belongs to an airplane but one airplane can be used for multiple flights . 
- A city have many airports but an airport belongs to a city 
 
# Tables

### City -> id , name , created_at , updated_at 

### Airport -> id , name , address , cityId , created_at , updated_at 

  Relationship - A city can have many airports but an airport belongs to a city .

 ```
 npx sequelize model:generate --name City --attributes name:String

 npx sequelize model:generate --name Airport --attributes name:String,address:String,cityId:integer
 ``` 

### Airplane -> modelNumber , capacity , created_at , updated_at 

```
npx sequelize model:generate --name Airplane --attributes modelNumber:String,capacity:integer
```

### flight -> flightNumber , airplaneId , departureAirportId , arrivalAirportId , arrivalTime , departureTime , price , boardingGate , totalSeats

```
npx sequelize model:generate --name Flights 
--attributes flightNumber:String,airplaneId:integer,departureAirportId:integer,arrivalAirportId:integer,arrivalTime:date,departureTime:date,price:integer,boardingGate:String,totalSeats:integer,price:integer
```

