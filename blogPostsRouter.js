'use strict';

//All of our necessary references and imports
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();

router.use((req,res,next) => {
  console.log('blog post', new Date(), req.method, req.url);
  next();
});

router.get('/', (req, res) => {

});

router.post('/', jsonParser, (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', jsonParser, (req, res) => {

});


//THE BOTTOM OF THE FILE
module.exports = router;