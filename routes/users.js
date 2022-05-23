const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/users');
const { isAuth } = require('../service/auth');

router.post('/sign_up', UsersControllers.signUp);
router.post('/sign_in', UsersControllers.signIn);

/* GET users listing. */
router.get('/users', isAuth, UsersControllers.getUsers);
router.get('/user', isAuth, UsersControllers.getUser);
router.patch('/user/:id/edit', isAuth, UsersControllers.editUser);
router.post(
    '/user/:id/updatePassword',
    isAuth,
    UsersControllers.updatePassword
);
module.exports = router;