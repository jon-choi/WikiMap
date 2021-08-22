// const { response } = require('express');
// const db = require('./db');

// const getMaps = () => {
//   return db.query('SELECT * FROM maps;')
//     .then((response) => {
//       console.log('------------>', response);
//       return response.rows;
//     })
// }

// const getMapById = (id) => {
//   return db.query('SELECT * FROM maps WHERE id = $1', [id])
//     .then((response) => {
//       return response.rows[0];
//     })
// }

// const createMap = (maps) => {
//   return db.query(`INSERT INTO maps (user_id, title, description)
//   VALUES ($1, $2, $3)
//   RETURNING *`, [maps.user_id, maps.title, maps.description])
//   .then((response) => {
//     return response.rows[0]
//   })
// }


// module.exports = {
//   getMaps,
//   getMapById,
//   createMap
// }
