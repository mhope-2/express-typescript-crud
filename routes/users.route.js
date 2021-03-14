const express = require('express');
const router = express.Router();
const {userList, registerUser,loginUser,refresh,logout} = require('../controllers/users.controller')


router.route('/')
.get(userList)

router.route('/register')
.post(registerUser);

router.route('/login')
.post(loginUser);


router.route('/refresh')
.post(refresh);

router.route('/logout')
.get(logout);


module.exports = router;