const { response } = require('express');
const db = require('./db');

const getMaps = () => {
  return db.query('SELECT * FROM maps ORDER BY id DESC;')
    .then((response) => {
      return response.rows;
    })
}

const getMapById = (id) => {
  return db.query(' SELECT * FROM maps WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    })
}

const getPointsById = (id) => {
  return db.query(' SELECT * FROM points WHERE map_id = $1', [id])
    .then((response) => {
      //console.log("*****************",db.query);
      return response.rows;
    })
}


// Insert new map
const createMap =  function(pointTitle, description) {
    const query = `INSERT INTO maps (title, description) VALUES($1, $2);`;
    return db.query(query, [pointTitle, description])
    .then(() => {
      return { success: true };
    });
}


const updatePoint = (id, pointTitle, description, latitude, longitude, image) => {
  const query = `
    UPDATE maps
    SET title = $1, description = $2
    WHERE id = $3;
  `;
  return db.query(query, [pointTitle, description, latitude, longitude, image, id])
    .then(() => {
      //console.log("*****************",query);
      return { success: true };
    });
};

const deletePoint = (id) => {
  const query = `DELETE FROM maps WHERE id = $1;`;

  return db.query(query, [id])
    .then(() => {
      return { success: true };
    });
};


module.exports = {
  getMaps,
  getMapById,
  createMap,
  deletePoint,
  updatePoint,
  getPointsById
}
