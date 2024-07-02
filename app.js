 const env = require('dotenv');
env.config({ path: './.env' });
const express = require('express');
const nodemon = require('nodemon');
const url = require('url');
const getClientIp = require("get-client-ip");
const { getLocationByIp } = require('ipapi-tools');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const  getWeatherData = require('./utils')
//  ?Environment variable
let PORT = process.env.PORT || 5500;
 app.set('trust proxy', true)
 // Example usage
        // Routes & API
// Functionality to fetch location through External api
app.get("/api/hello", (req, res) => {
   let{query} = url.parse(req.url, true);   
      const name = query.visitor_name
      
         let dataGlobal;
         const getData = async () => {
            const response = await fetch('http://ip-api.com/json/?fields=61439');
            const data = await response.json();
                dataGlobal = data;
                console.log(dataGlobal)
                   return data;
};
                     (async () => {
                        await getData();
                          getWeatherData( dataGlobal.city) //passing location as an argument//
                          .then((data) => {
                          
                            res.status(200).json({
                                client_ip: req.ip,
                                location: data.name,
                                greetings: !query.visitor_name?
                                `Hello User! the temperature is ${data.main.temp} degrees Celcius in ${data.name}`:
                                `Hello ${query.visitor_name}! the temperature is ${data.main.temp} degrees Celcius in ${data.name}`
                            }) 
   })
                  .catch((error) => {
                  console.error(error);
    });
 })();

});
 
 

//  Server
app.listen(5500, () => {
    console.log(`Server is running on port 5500 `);
});