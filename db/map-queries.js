const db = require('./db');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then((response) => {
      return response.rows;
    })
}

module.exports = {
  getMaps
}
