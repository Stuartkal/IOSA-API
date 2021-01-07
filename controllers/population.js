
const Populaton = require('../modals/population')
const User = require('../modals/user')

exports.postPopulation =  (req, res, next) => {
    const numberOfNewborns = req.body.numberOfNewborns
    const numberOfDeaths = req.body.numberOfDeaths

    let creator

    const population = new Populaton({
        numberOfNewborns: numberOfNewborns,
        numberOfDeaths: numberOfDeaths,
        creator: req.userId
    })
    population.save()
    .then(result => {
        return User.findById(req.userId)
    })
    .then(user => {
        creator = user
        user.population.push(population)
        return user.save()
    })
    .then(result => {
        res.status(201).json({
            message: 'Population Record added',
            creator: {_id: creator._id, name: creator.username}
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.getPopulation =  (req, res, next) => {
    const query = { creator: req.userId }
    Populaton.find(query)
    .then(populate => {
        res.status(200).json({
            message: 'Populations fetched Successfully',
            population: populate
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}