const express = require('express');
const router = express.Router();
const controller = require('../controllers/resumeController');

router.get('/', controller.getHomePage);
router.get('/skills', controller.getSkillsPage);
router.get('/projects', controller.getProjectsPage);
router.get('/address', controller.getAddressPage);


module.exports = router;
