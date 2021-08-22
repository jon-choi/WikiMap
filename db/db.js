const pg = require('pg');
const Client = pg.Client;

<<<<<<< HEAD
const pg = require('pg');

const Client = pg.Client;

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
};

const client = new Client(config);
client.connect(() => {
  console.log('DB client');
});
=======

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};

const client = new Client(config);

client.connect(() => {
  console.log("connected to database :)");
})

>>>>>>> newfeature/mapRoute
module.exports = client;
