const express = require('express');
const path = require('path');
const parser = require('body-parser');
const request = require('request');
// const router = require('../server/resources/proxyRouter.js');

const proxy = express();
const PORT = 1337;

proxy.use(parser.json());
proxy.use(parser.urlencoded({extended: true}));
proxy.use(express.static(path.join(__dirname, "../public/dist")));

// proxy.use('/api', router)

proxy.use('/api/pageDetails/data', (req, res) => {
  request('http://localhost:3018/api/pageDetails/data', (error, response, body) => {
    if(response.statusCode === 200) {
      res.status(200).send(body);
    }
  })
})
proxy.use('/api/amenities', (req, res) => {
  request('http://localhost:3012/api/amenities', (error, response, body) => {
    if(response.statusCode === 200) {
      res.status(200).send(body);
    }
  })
})
proxy.use('/api/rooms/1', (req, res) => {
  request('http://localhost:3000/api/rooms/1', (error, response, body) => {
    if(response.statusCode === 200) {
      res.status(200).send(body);
    }
  })
})
proxy.listen(PORT, () => console.log(`Successfully connected to PROXY: ${PORT}`))