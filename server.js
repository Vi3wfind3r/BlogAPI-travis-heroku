'use strict';

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const blogPostsRouter = require('./blogPostsRouter.js');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// when requests come into `/blog-posts` or
// we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/blog-posts', blogPostsRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});



