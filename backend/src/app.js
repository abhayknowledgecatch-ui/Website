// main express app
const express = require('express');
const app = express();

// middleware setup
app.use(express.json());

module.exports = app;
