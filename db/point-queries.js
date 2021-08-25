const { response } = require('express');
const db = require('./db');

const getPoints = () => {
  return db.query('SELECT * FROM points ORDER BY id DESC;')
    .then((response) => {
      return response.rows;
    })
}

const getPointById = (id) => {
  return db.query(' SELECT id FROM points WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    })
}


// Insert new point
const createPoint =  function(pointTitle, description) {

    const query = `INSERT INTO points (title, description) VALUES($1, $2);`;
            //const query = `INSERT INTO points (user_id, map_id, title, description, latitude, longitude, image )VALUES ($1, $2, $3, $4, $5, $6, $7)  [point.user_id, point.map_id, pointTitle, description, point.latitude, point.longitude, point.image])
    return db.query(query, [pointTitle, description])
    .then(() => {
      return { success: true };
    });
}
// exports.newPoint = newPoint;


const updatePoint = (id, pointTitle, description, latitude, longitude, image) => {
  const query = `
    UPDATE points
    SET title = $1, description = $2, latitude = $3, longitude = $4, image = $5
    WHERE id = $6;
  `;

  return db.query(query, [pointTitle, description, latitude, longitude, image, id])

    .then(() => {
      //console.log("*****************",query);
      return { success: true };
    });
};




const deletePoint = (id) => {
  const query = `DELETE FROM points WHERE id = $1;`;

  return db.query(query, [id])
    .then(() => {
      return { success: true };
    });
};


module.exports = {
  getPoints,
  getPointById,
  createPoint,
  deletePoint,
  updatePoint
}
