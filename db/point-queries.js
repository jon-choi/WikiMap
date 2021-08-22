const { response } = require('express');
const db = require('./db');

const getPoints = () => {
  return db.query('SELECT * FROM points;')
    .then((response) => {
      return response.rows;
    })
}

const getPointById = (id) => {
  return db.query('SELECT * FROM points WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    })
}

module.exports = {
  getPoints,
  getPointById
}
