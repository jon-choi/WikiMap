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
const addPoint =  function(point) {
  return pool
    .query(`INSERT INTO points (user_id, map_id, title, description, latitude, longitude, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [point.user_id, point.map_id, point.title, point.description, point.latitude, point.longitude, point.image])
    .then((newPoint => newPoint.rows[0]))
    .catch((err) => err.message);
}
module.exports = {
  getPoints,
  getPointById,
  addPoint
}
