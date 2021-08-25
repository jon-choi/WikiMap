const express = require('express');
const router = express.Router();

app.post("/login", (req, res) => {
 req.session.user_id = 1;
});

app.get("/login", (req, res) => {
  res.render("/", { "user": null });
});
