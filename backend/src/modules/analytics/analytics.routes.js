// analytics routes
const express = require('express');
const router = express.Router();
const { adminStats, userStats } = require('./analytics.controller');
const auth = require('../../middleware/auth.middleware');
const role = require('../../middleware/role.middleware');

// Admin-only overview
router.get('/admin', auth, role(['admin']), adminStats);

// Normal user stats (requires authentication)
router.get('/user', auth, userStats);

module.exports = router;
