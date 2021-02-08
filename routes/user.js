const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const User = require('../modals/user')
const userControllers = require('../controllers/user')

const isAuth = require('../middleware/is-auth')

router.put(
    '/register',
    [
        body('username')
            .isLength({ min: 5 })
            .custom((value, { req }) => {
                return User.findOne({ username: value }).then((userDoc) => {
                    if (userDoc) {
                        return Promise.reject('Email Address already Exists')
                    }
                })
            }),
        body('password').isLength({ min: 8 }).withMessage('Password is Weak'),
    ],
    userControllers.signUp
)

router.post('/signin', userControllers.signIn)

router.post('/revenue/:userId',isAuth,userControllers.revenue)

router.get('/user-profile/:userId',isAuth,userControllers.getUserProfile)

module.exports = router
