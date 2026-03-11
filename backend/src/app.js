// main express app
const express = require('express');
const app = express();

// middleware setup
app.use(express.json());

// route registration
const analyticsRoutes = require('./modules/analytics/analytics.routes');
app.use('/api/analytics', analyticsRoutes);

module.exports = app;
