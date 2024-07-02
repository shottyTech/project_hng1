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
      
    
          async function getData () {
            var requestOptions = {
               method: 'GET',
             };
             
            const data = await fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=97cd821ceea94a81b18ac03dbaef9a17", requestOptions)
                .then(response => response.json())
                .then(result => result)
               .catch(error => console.log('error', error));
              return data
    };

                     (async () => {
                          const dataGlobal = await getData();
                          
                          getWeatherData( dataGlobal.city.name) //passing location as an argument//                 
                          .then((data) => {
                            console.log(data)
                            res.status(200).json({
                                client_ip: req.ip,
                                location:data.name,
                                greetings: !query.visitor_name?
                                `Hello User! the temperature ${data.main.temp} degrees Celcius in ${data.name}`:
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