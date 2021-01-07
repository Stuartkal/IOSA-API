const {validationResult} = require('express-validator')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../modals/user')

exports.signUp = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Invalid LonginDetails')
        error.statusCode = 422;
        error.data = errors.array()
        throw error
    }

    const username = req.body.username
    const password = req.body.password

    bycrypt
    .hash(password,12)
    .then(hashedPw => {
        const user = new User({
            username: username,
            password:hashedPw
        })
        user.save()
    })
    .then(result => {
        res.status(201).json({
            message: 'User Registered Successfully'
        })
    })
    .catch(err=> {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })

}

exports.signIn = (req,res,next) => {
    const username = req.body.username
    const password = req.body.password

    let loadUser 

    User.findOne({username:username})
    .then(user => {
        if(!user){
            const error = new Error('User Not Found')
        }
        loadUser = user

        return bycrypt.compare(password, user.password)
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('Password does not match')
            error.statusCode = 404
            throw error
        }
        const token = jwt.sign({
            email: loadUser.email,
            userId: loadUser._id.toString()
        },
        process.env.JWT_SECRET,
        {expiresIn: '1hr'})
        res.status(200).json({
            message: 'User Logged In Successfully',
            token:token,
            userId: loadUser._id.toString(),
            username: loadUser.username
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}