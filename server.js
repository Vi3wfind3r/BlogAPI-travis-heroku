'use strict';

const express = require('express');
const router = express.Router();
const morgan = require('morgan');

const blogPostsRouter = require('./blogPostsRouter.js');
const {BlogPosts} = require('./models');

const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

BlogPosts.create('Raining today', 'Today it is raining; I just saw a water spout. Yikes!' , 'Chris');
BlogPosts.create('Sunny today', '95 degrees and sunny here', 'Kyle R');
BlogPosts.create('Expecting rain', 'Maybe that rain from FL will hit here. Not sure yet.', 'William');


// when requests come into `/blog-posts` or
// we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/blog-posts', blogPostsRouter);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

//Commented the below out because of runServer and closeServer
// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};


