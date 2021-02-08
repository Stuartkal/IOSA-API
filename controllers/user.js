const { validationResult } = require('express-validator')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../modals/user')
const Revenue = require('../modals/revenue')

exports.signUp = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Invalid LonginDetails')
        error.statusCode = 422
        error.data = errors.array()
        throw error
    }

    const username = req.body.username
    const password = req.body.password

    bycrypt
        .hash(password, 12)
        .then((hashedPw) => {
            const user = new User({
                username: username,
                password: hashedPw,
            })
            user.save()
        })
        .then((result) => {
            res.status(201).json({
                message: 'User Registered Successfully',
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.signIn = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    let loadUser

    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                const error = new Error('User Not Found')
            }
            loadUser = user

            return bycrypt.compare(password, user.password)
        })
        .then((isEqual) => {
            if (!isEqual) {
                const error = new Error('Password does not match')
                error.statusCode = 404
                throw error
            }
            const token = jwt.sign(
                {
                    email: loadUser.email,
                    userId: loadUser._id.toString(),
                },
                process.env.JWT_SECRET,
                { expiresIn: '2hr' }
            )
            res.status(200).json({
                message: 'User Logged In Successfully',
                token: token,
                userId: loadUser._id.toString(),
                username: loadUser.username,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.revenue = (req, res, next) => {
    const userId = req.params.userId

    const expenditure = req.body.expenditure
    const gross_revenue = req.body.gross_revenue
    const net_revenue = req.body.net_revenue
    
    User.findById(userId)
    .then(user => {
        if (!user) {
            const error = new Error('User not Found')
            error.statusCode = 404
            throw error
        }
        if(user.net_revenue){
            user.net_revenue = parseInt(user.net_revenue) + parseInt(net_revenue)
        }else {
            user.net_revenue = net_revenue
        }

        if(user.gross_revenue){
            user.gross_revenue = parseInt(user.gross_revenue) + parseInt(gross_revenue)
        }else {
            user.gross_revenue = gross_revenue
        }

        if(user.expenditure){
            user.expenditure = parseInt(user.expenditure) + parseInt(expenditure)
        }else {
            user.expenditure = expenditure
        }


        return user.save()
    })
    .then (result => {
        const revenue = new Revenue({
            expenditure: expenditure,
            gross_revenue: gross_revenue,
            net_revenue: net_revenue,
            creator: userId

        })
        revenue.save()
    })
    .then(result =>{
        res.status(200).json({
            message:'Revenue added',
            revenue: result
        })
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getUserProfile = (req,res,next) => {
    const userId = req.params.userId
    User.findById(userId)
    .then(userDoc => {
        res.status(200).json({
            message: 'User fetched Successfully',
            user: userDoc,
        })
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}