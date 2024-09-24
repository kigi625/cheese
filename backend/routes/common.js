const express = require('express');
const router = express.Router();
const controllers = require('../controllers/common');

router.get('/csrfToken', controllers.getCsrfToken);

module.exports = router;
