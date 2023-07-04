const express = require('express');
const router = express.Router();

const {Registration} = require('../Controllers/RegisterController')
const {newLogin} = require('../Controllers/LoginController')
const {ForgetPassWord, ForgetPassWordPage, UpdatePassword}  = require('../Controllers/ForgetPasswordController')

router.post('/register', Registration)

router.post('/login', newLogin )

router.post('/CheckuserEmail', ForgetPassWord)

router.get('/forget-password', ForgetPassWordPage)

router.post('/update-password', UpdatePassword)



module.exports = router;