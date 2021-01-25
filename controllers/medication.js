const Medication = require('../modals/medication')


const User = require('../modals/user')

exports.postMedication = (req,res,next) => {
    const medication = req.body._medication
    const medicationDate = req.body.medicationDate
    const cageNumber = req.body.cageNumber
    const gender = req.body.gender
    const medicationType = req.body.medicationType
    const remarks = req.body.remarks

    let creator

    const medications = new Medication({
        _medication: medication,
        medicationDate: medicationDate,
        cageNumber: cageNumber,
        gender: gender,
        medicationType: medicationType,
        remarks: remarks,
        creator: req.userId
    })
    medications
        .save()
        .then((result) => {
            return User.findById(req.userId)
        })
        .then((user) => {
            creator = user
            user.medication.push(medications)
            return user.save()
        })
        .then((result) => {
            res.status(201).json({
                message: 'Medication Record added',
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

exports.getMedication = (req,res,next) => {
    const query = { creator: req.userId }
    Medication.find(query)
        .then((medicate) => {
            res.status(200).json({
                message: '  medication fetched Successfully',
                medication: medicate,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteMedication = (req, res, next) => {
    const medicationId = req.params.medicationId

    Medication.findById(medicationId)
    .then(medicate => {
        if(!medicate) {
            const error = new Error('Cannot find Medication record')
            error.statusCode = 404
            throw error
        }

        if(medicate.creator.toString() !== req.userId){
            const error = new Error('Not Authorized to delete Medication')
            error.statusCode = 403
            throw error
        }
        return Medication.findByIdAndRemove(medicationId)
        })
        .then(resutl => {
            return User.findById(req.userId)
        })
        .then(user => {
            user.medication.pull(medicationId)
            return user.save()
        })
        .then(result => {
            res.status(200).json({
                message: 'Medication Deleted Successfully'
            })
        })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.singleMedication = (req, res, next) => {
    const medicationId = req.params.medicationId
    Medication.findById(medicationId)
        .then((medicate) => {
            res.status(200).json({
                message: 'Medication Fetched Successfully',
                medication: medicate,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}