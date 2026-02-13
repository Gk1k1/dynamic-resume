const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumeController');

router.get('/', controller.getHomePage);
router.get('/skills', controller.getSkillsPage);
router.get('/projects', controller.getProjectsPage);
router.get('/address', controller.getAddressPage);

// POST route to add a skill
router.post('/skills/add', controller.addSkill);

// Fallback GET route for /skills/add to prevent 404 if user lands there
router.get('/skills/add', (req, res) => res.redirect('/skills'));

module.exports = router;
