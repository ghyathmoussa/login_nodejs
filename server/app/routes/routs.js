const express = require('express')
const router = express.Router()
const loginC = require('../controllers/loginC')
const registerC = require('../controllers/registerC')

router.post('/login',loginC.login)
router.post('/register',registerC.register)

module.exports = router