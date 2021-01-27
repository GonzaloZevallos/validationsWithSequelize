var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/users', apiController.list);
router.post('/users', apiController.create);
router.put('/users/:id', apiController.update);
router.delete('/users/:id', apiController.delete);

router.post('/users/login', apiController.login);

module.exports = router;
