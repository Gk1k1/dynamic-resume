const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumeController');

// GET /api/resume — retrieve all resume data
router.get('/resume', controller.apiGetResume);

// PUT /api/resume — update resume data
router.put('/resume', controller.apiUpdateResume);

module.exports = router;
