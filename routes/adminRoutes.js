const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumeController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// Admin dashboard (Protected)
router.get('/', isAuthenticated, isAdmin, controller.getAdminDashboard);

// All other admin actions (Protected)
router.post('/projects', isAuthenticated, isAdmin, controller.addProject);
router.post('/projects/delete/:id', isAuthenticated, isAdmin, controller.deleteProject);
router.post('/skills', isAuthenticated, isAdmin, controller.updateSkills);
router.post('/summary', isAuthenticated, isAdmin, controller.updateSummary);
router.post('/profile', isAuthenticated, isAdmin, controller.updateProfile);
router.post('/experience', isAuthenticated, isAdmin, controller.addExperience);
router.post('/experience/delete/:id', isAuthenticated, isAdmin, controller.deleteExperience);

module.exports = router;
