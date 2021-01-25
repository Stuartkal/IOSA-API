const moment = require('moment')

const Breeding = require('../modals/breeding')
const User = require('../modals/user')


exports.addBreeding = (req, res, next) => {
    const breed = req.body.breed
    const dateOfBirth = req.body.dateOfBirth
    const gender = req.body.gender
    const parent = req.body.parent
    const femaleCageNumber = req.body.femaleCageNumber
    const maleCageNumber = req.body.maleCageNumber
    const breedingDate = req.body.breedingDate
    const kindlingBox = req.body.kindlingBox
    const kindlingDate = req.body.kindlingDate
    const numberAlive = req.body.numberAlive
    const numberDead = req.body.numberDead
    const weaningDate = req.body.weaningDate
    const nextBreedingDate = req.body.nextBreedingDate

    let creator

    const breeding = new Breeding({
        breed: breed,
        dateOfBirth: dateOfBirth,
        gender: gender,
        parent: parent,
        femaleCageNumber: femaleCageNumber,
        maleCageNumber: maleCageNumber,
        breedingDate: breedingDate,
        kindlingBox: kindlingBox,
        kindlingDate: kindlingDate,
        numberAlive: numberAlive,
        numberDead: numberDead,
        weaningDate: weaningDate,
        nextBreedingDate: nextBreedingDate,
        creator: req.userId,
    })
    breeding
        .save()
        .then((result) => {
            return User.findById(req.userId)
        })
        .then((user) => {
            creator = user
            user.breeding.push(breeding)
            return user.save()
        })
        .then((result) => {
            res.status(201).json({
                message: 'Breeding added Successfully',
                creator: { _id: creator._id, name: creator.username },
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getBreeding = (req, res, next) => {
    const query = { creator: req.userId }
    Breeding.find(query)
        .then((breeding) => {
            res.status(200).json({
                message: 'Breedings fetched Successfully',
                breedings: breeding,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getKindlingBox = (req, res, next) => {
    const today = moment(new Date()).format('DD-MM-YYYY') 
    const query = { creator: req.userId, kindlingBox: today }

    Breeding.find(query)
        .then((breeding) => {
            res.status(200).json({
                message: 'Breedings fetched Successfully',
                breedings: breeding,
            })            

        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getWeaningDate = (req, res, next) => {
    const today = moment(new Date()).format('DD-MM-YYYY')
    const query = { creator: req.userId, weaningDate:today }
    Breeding.find(query)
        .then((breeding) => {
            res.status(200).json({
                message: 'Breedings fetched Successfully',
                breedings: breeding,
            })
        return notifications.save()
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.getNextBreedingDate = (req, res, next) => {
    const today = moment(new Date()).format('DD-MM-YYYY')
    const query = { creator: req.userId, nextBreedingDate:today }
    Breeding.find(query)
        .then((breeding) => {
            res.status(200).json({
                message: 'Breedings fetched Successfully',
                breedings: breeding,
            })
        return notifications.save()
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.singleBreeding = (req, res, next) => {
    const breedingId = req.params.breedingId
    Breeding.findById(breedingId)
        .then((breeding) => {
            res.status(200).json({
                message: 'Breed Fetched Successfully',
                breeding: breeding,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteBreeding = (req, res, next) => {
    const breedingId = req.params.breedingId

    Breeding.findById(breedingId)
        .then((breeding) => {
            if (!breeding) {
                const error = new Error('Cannot find breeding')
                error.statusCode = 404
                throw error
            }
            if (breeding.creator.toString() !== req.userId) {
                const error = new Error('Not Authorized to delete breeding')
                error.statusCode = 403
                throw error
            }
            return Breeding.findByIdAndRemove(breedingId)
        })
        .then((result) => {
            return User.findById(req.userId)
        })
        .then((user) => {
            user.breeding.pull(breedingId)
            return user.save()
        })
        .then((result) => {
            // console.log(result)
            res.status(200).json({
                message: 'breeding Deleted Successfully',
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
