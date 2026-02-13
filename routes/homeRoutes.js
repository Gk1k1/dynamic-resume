const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumeController');
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', controller.getHomePage);
router.get('/skills', controller.getSkillsPage);
router.get('/projects', controller.getProjectsPage);
router.get('/address', controller.getAddressPage);
router.get('/experience', controller.getExperiencePage);

// Auth Routes
router.get('/login', authController.getLoginPage);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// POST route to add a skill (Protected)
router.post('/skills/add', isAuthenticated, controller.addSkill);

// POST route to add an experience (Protected)
router.post('/experience/add', isAuthenticated, controller.addExperiencePublic);

// POST route to delete an experience from the public page (Protected)
router.post('/experience/delete/:id', isAuthenticated, controller.deleteExperiencePublic);

// Fallback GET route for /skills/add to prevent 404 if user lands there
router.get('/skills/add', (req, res) => res.redirect('/skills'));

module.exports = router;
