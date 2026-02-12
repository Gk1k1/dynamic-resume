const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumeController');

// Admin dashboard
router.get('/', controller.getAdminDashboard);

// Add project
router.post('/projects', controller.addProject);

// Delete project
router.post('/projects/delete/:id', controller.deleteProject);

// Update skills
router.post('/skills', controller.updateSkills);

// Update summary
router.post('/summary', controller.updateSummary);

// Update profile
router.post('/profile', controller.updateProfile);

module.exports = router;
