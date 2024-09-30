const express = require('express');
const router = express.Router();
const controllers = require('../controllers/common');

router.get('/csrfToken', controllers.getCsrfToken);
router.post('/totalAnaly', controllers.getTotalAnaly);
router.get('/result', controllers.getResult);

module.exports = router;
