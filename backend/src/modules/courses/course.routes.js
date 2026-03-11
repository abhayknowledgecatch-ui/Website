// course routes
const express = require('express');
const router = express.Router();
const {
  list,
  get,
  create,
  update,
  remove
} = require('./course.controller');
const auth = require('../../middleware/auth.middleware');
const role = require('../../middleware/role.middleware');

// public listing
router.get('/', list);
// get single course
router.get('/:courseId', get);

// below endpoints require authentication
router.post('/', auth, role(['admin']), create);
router.put('/:courseId', auth, role(['admin']), update);
router.delete('/:courseId', auth, role(['admin']), remove);

module.exports = router;
