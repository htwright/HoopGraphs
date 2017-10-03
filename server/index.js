const path = require('path');
const express = require('express');
const D3Node = require('d3-node');
const fetch = require('node-fetch');
const app = express();
const btoa = require('btoa');
const {DATABASE_URL, MSF_UN, MSF_PW} = require('./config');
const apiAuth = btoa(MSF_UN + ':' + MSF_PW);
const {Stats} = require('./models');
const mongoose = require('mongoose');
console.log(DATABASE_URL)
let search = 'curry';
const MSF_url = `https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/cumulative_player_stats.json?playerstats=2PA,2PM,3PA,3PM,FTA,FTM,PTS/G,AST/G,STL/G,REB/G,TOV/G&player=${search}`

// API endpoints go here!


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));


app.get('/api/test', (req, res) => {
  Stats.findOne().then(data => res.json(data)).catch(err =>console.error(err));
  // console.log(d3n.svgString());
});

app.post('/api/db', (req, res) => {
  fetch(MSF_url, {headers: { Authorization: `Basic ${apiAuth}` }})
  .then(data => data.json())
  .then(data => {
    Stats
    .create({player: data})
  }).then(() => {
    res.status(201).send();
  }).catch(err => console.error(err));
  
});

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
  let promise = mongoose.connect(DATABASE_URL, {useMongoClient:true});
  // return new Promise((resolve, reject) => {
    // mongoose.connect(DATABASE_URL, {useMongoClient:true}.then(() => {
    promise.then(() => {
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
      })
    }).catch(err => {
        mongoose.disconnect();
        console.error(err);      
  });
};

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
