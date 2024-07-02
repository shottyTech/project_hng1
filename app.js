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


 app.get('/',(req,res)=>{
  const client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
   res.send(ip)
 })
 
        // Routes & API
// Functionality to fetch location through External api
app.get("/api/hello", (req, res) => {
   let{query} = url.parse(req.url, true);   
      const name = query.visitor_name
      
    
          async function fetchData () {
            var requestOptions = {
               method: 'GET',
             };
             
          return fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=09ac33ff93794767b1e5f8131b8c7f25", requestOptions)
               .then(response => response.json())
               .then(result => result)
               .catch(error => console.log('error', error));
         }  
       
         async function getData(){
         const datas =  await fetchData() 
         const data= await  getWeatherData(datas.city.name)
           console.log(data)
           
           res.status(200).json({
            client_ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            location:data.name,
            greetings: !query.visitor_name?
            `Hello User! the temperature ${data.main.temp} degrees Celcius in ${data.name}`:
            `Hello ${query.visitor_name}! the temperature is ${data.main.temp} degrees Celcius in ${data.name}`
        }) 
  }
       getData()
           
 });
 
//  Server
app.listen(5500, () => {
    console.log(`Server is running on port 5500 `);
});