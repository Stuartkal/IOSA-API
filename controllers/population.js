const Population = require('../modals/population')
const User = require('../modals/user')

exports.postPopulation = (req, res, next) => {
    const year = req.body.year
    const month = req.body.month
    const recordDate = req.body.recordDate
    const numberOfFemales = req.body.year
    const numberOfMales = req.body.numberOfMales
    const numberOfNewborns = req.body.numberOfNewborns
    const numberOfDeathsInMonth = req.body.numberOfDeathsInMonth

    let creator
    
    const population = new Population({
        year: year,
        month: month,
        recordDate: recordDate,
        numberOfFemales: numberOfFemales,
        numberOfMales: numberOfMales,
        numberOfNewborns: numberOfNewborns,
        numberOfDeathsInMonth: numberOfDeathsInMonth,
        creator: req.userId,
    })
    population
        .save()
        .then((result) => {
            return User.findById(req.userId)
        })
        .then((user) => {
            creator = user
            user.population.push(population)
            return user.save()
        })
        .then((result) => {
            res.status(201).json({
                message: 'Population Record added',
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

exports.getPopulation = (req, res, next) => {
    const query = { creator: req.userId }
    Populaton.find(query)
        .then((populate) => {
            res.status(200).json({
                message: 'Populations fetched Successfully',
                population: populate,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
