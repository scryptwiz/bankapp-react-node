const express = require('express');
const router = express.Router()
const { signin } = require('../Controllers/SigninController');
const { signup } = require('../Controllers/SignupController');

router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router