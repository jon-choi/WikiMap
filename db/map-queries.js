const db = require('./db');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then((response) => {
      return response.rows;
    })
}

const getMapById = (id) => {
  return db.query(`SELECT * FROM maps WHERE id = $1`, [id])
    .then((response) => {
      return response.rows[0];
    })
}

module.exports = {
  getMaps,
  getMapById
}
