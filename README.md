# Welcome to Flights Service
## Description 

This is a part of a series of microservices on Flight Management System mainly foccused on delivering flight and search API routes.

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

# API

## City Model 

- Schema example 

```
  {
      "id" : 1 , 
      "name" : "Delhi"
      "createdAt" : "2023-03-19 07:10:49"
      "updatedAt" : "2023-03-19 07:10:49" 
  }

```
### Routes 

**Desc**: Create city 

**Route** : `/city`

**Method**: `POST`

**Body** : 

```
  {
    "name" : "jhasi"
  }
```

**Response** : 

```
   {
    "data": {
        "id": 28,
        "name": "jhasi",
        "updatedAt": "2023-04-22T18:14:48.571Z",
        "createdAt": "2023-04-22T18:14:48.571Z"
    },
    "success": true,
    "message": "Successfully created a city",
    "err": {}
}
```

---

**Desc**: Delete city 

**Route** : `/city/cityId`

**Method**: `DELETE`

**Response** :

```
{
    "data": 1,
    "success": true,
    "message": "Successfully deleted a city",
    "err": {}
}
```

---

**Desc**: Get city 

**Route** : `/city/cityId`

**Method**: `GET`

**Response** : 
```
   {
    "data": {
        "id": 20,
        "name": "delhi",
        "createdAt": "2023-03-19T07:10:49.000Z",
        "updatedAt": "2023-03-19T07:10:49.000Z"
    },
    "success": true,
    "message": "Successfully fetched a city",
    "err": {}
}   

``` 

---

**Desc**: Get all cities 

**Route** : `/city`

**Method**: `GET`


**Response** : 

```
  {
    "data": [
        {
            "id": 20,
            "name": "delhi",
            "createdAt": "2023-03-19T07:10:49.000Z",
            "updatedAt": "2023-03-19T07:10:49.000Z"
        },
        {
            "id": 21,
            "name": "pune",
            "createdAt": "2023-03-19T07:10:49.000Z",
            "updatedAt": "2023-03-19T07:10:49.000Z"
        },
        {
            "id": 25,
            "name": "Mumbai",
            "createdAt": "2023-03-19T07:10:49.000Z",
            "updatedAt": "2023-03-19T07:10:49.000Z"
        },
        {
            "id": 26,
            "name": "allahbad",
            "createdAt": "2023-03-19T07:10:49.000Z",
            "updatedAt": "2023-03-19T07:10:49.000Z"
        }
    ],
    "success": true,
    "message": "Successfully fetched all cities",
    "err": {}
}
```

---

**Desc**: Get all airports corresponding to cityId 

**Route** : `/city/airports/cityId`

**Method**: `GET`

**Response** : 

```
{
    "data": [
        {
            "id": 4,
            "name": "Indira Gandhi International Airport",
            "address": null,
            "cityId": 20,
            "createdAt": "2023-03-19T07:12:59.000Z",
            "updatedAt": "2023-03-19T07:12:59.000Z"
        },
        {
            "id": 5,
            "name": "Safdarjung Airport",
            "address": null,
            "cityId": 20,
            "createdAt": "2023-03-19T07:12:59.000Z",
            "updatedAt": "2023-03-19T07:12:59.000Z"
        }
    ],
    "success": true,
    "message": "Successfully fetched airports of a city",
    "err": {}
}
```

---

**Desc**: Update city 

**Route** : `/city/cityId`

**Method**: `PATCH`

**Response** : 

```
{
    "data": {
        "id": 20,
        "name": "delhi",
        "createdAt": "2023-03-19T07:10:49.000Z",
        "updatedAt": "2023-03-19T07:10:49.000Z"
    },
    "success": true,
    "message": "Successfully updated a city",
    "err": {}
}
```

## Flight model

- Schema example


```
{

    "flightNumber" : "Pk 120" , 
    "airplaneId" : 4 , 
    "departureAirportId" :  25 , 
    "arrivalAirportId" : 26 ,
    "arrivalTime" : 2018-03-29 10:34:00 , 
    "departureTime" : 2018-03-29 3:34:00 , 
    "price" : 2400 , 
    "boardingGate" : "A2" , 
    "totalSeats" : 300

}
```
### Routes 

**Desc**: Create flight 

**Route** : `/flights`

**Method**: `POST`

**Body** : 

```
{

    "flightNumber" : "Pk 12" , 
    "airplaneId" : 4 , 
    "departureAirportId" :  25 , 
    "arrivalAirportId" : 26 ,
    "arrivalTime" : 2018-03-29 10:34:00 , 
    "departureTime" : 2018-03-29 3:34:00 , 
    "price" : 2400 , 
    "boardingGate" : "A2" , 
    "totalSeats" : 300

}
  
```

**Response** : 

```
   {
    "data": {
        "id": 24,
        "flightNumber": "Pk 12",
        "airplaneId": "4",
        "departureAirportId": "25",
        "arrivalAirportId": "26",
        "arrivalTime": "2018-03-29T05:04:00.000Z",
        "departureTime": "2018-03-28T22:04:00.000Z",
        "boardingGate": "A2",
        "price": "2400",
        "totalSeats": 300,
        "updatedAt": "2023-04-22T18:32:32.836Z",
        "createdAt": "2023-04-22T18:32:32.836Z"
    },
    "success": true,
    "err": {},
    "message": "Successfully created a flight"
}
```

---

**Desc**: Fetch All flights  

**Route** : `/flights`

**Method**: `GET`

**Response** : 

```
   {
    "data": [
        {
            "id": 1,
            "flightNumber": "UK 128",
            "airplaneId": 1,
            "departureAirportId": 20,
            "arrivalAirportId": 21,
            "arrivalTime": "2018-03-29T05:04:00.000Z",
            "departureTime": "2018-03-28T22:04:00.000Z",
            "price": 2400,
            "boardingGate": "A2",
            "totalSeats": 269,
            "createdAt": "2023-03-19T07:50:23.000Z",
            "updatedAt": "2023-04-21T17:00:46.000Z"
        },
        {
            "id": 3,
            "flightNumber": "Pk 12",
            "airplaneId": 4,
            "departureAirportId": 25,
            "arrivalAirportId": 26,
            "arrivalTime": "2018-03-29T05:04:00.000Z",
            "departureTime": "2018-03-28T22:04:00.000Z",
            "price": 2400,
            "boardingGate": "A2",
            "totalSeats": 300,
            "createdAt": "2023-03-19T07:54:03.000Z",
            "updatedAt": "2023-03-19T07:54:03.000Z"
        }
    ],
    "success": true,
    "err": {},
    "message": "Successfully able to fetch all flights based on data provided"
}
```
---

**Desc**: Fetch flights 

**Route** : `/flights/flightId`

**Method**: `GET`

**Response** : 

```
  {
    "data": {
        "id": 3,
        "flightNumber": "Pk 120",
        "airplaneId": 4,
        "departureAirportId": 25,
        "arrivalAirportId": 26,
        "arrivalTime": "2018-03-29T05:04:00.000Z",
        "departureTime": "2018-03-28T22:04:00.000Z",
        "price": 2400,
        "boardingGate": "A2",
        "totalSeats": 300,
        "createdAt": "2023-03-19T07:54:03.000Z",
        "updatedAt": "2023-03-19T07:54:03.000Z"
    },
    "success": true,
    "err": {},
    "message": "Successfully able to fetch flight based on data provided"
}
```
---

**Desc**: Update flight

**Route** : `/flights/flightId`

**Method**: `GET` 

**Body** : 
```
  {
      "flightNumber" : "S3" 
  }
```

**Response** : 

```
  {
    "data": true,
    "success": true,
    "err": {},
    "message": "Successfully able to update a flight based on data provided"
  }

```

## Airport Model 

- Schema Example 

```
  {
      "name" : "JC Bose" , 
      "address" : "Salt Lake" , 
      "cityId" : 25 , 
      "createdAt": "2023-03-19T07:50:23.000Z",
      "updatedAt": "2023-04-21T17:00:46.000Z"
  }

```

**Desc**: Create Airport

**Route** : `/airports`

**Method**: `POST` 

**Body** : 
```
  {
      "name" : "JC Bose" , 
      "address" : "Salt Lake" , 
      "cityId" : 25 , 
  }
```

**Response** : 

```
  {
    "data": {
        "id": 7,
        "name": "JC Bose",
        "address": "Salt Lake",
        "cityId": "25",
        "updatedAt": "2023-04-22T18:59:46.207Z",
        "createdAt": "2023-04-22T18:59:46.207Z"
    },
    "success": true,
    "err": {},
    "message": "Created a new airport"
}

```









