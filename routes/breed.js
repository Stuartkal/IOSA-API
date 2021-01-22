const express = require('express')

const router = express.Router()

const isAuth = require('../middleware/is-auth')

const breedControllers = require('../controllers/breed')
const populationController = require('../controllers/population')
const bookKeepingController = require('../controllers/bookkeeping')

router.post('/breeding', isAuth, breedControllers.addBreeding)

router.get('/breedings', isAuth, breedControllers.getBreeding)

router.get('/breeding/:breedingId', isAuth, breedControllers.singleBreeding)

router.delete('/breeding/:breedingId', isAuth, breedControllers.deleteBreeding)

//Medication
router.get('/kindling-box',isAuth, breedControllers.getKindlingBox)
router.get('/weaning-date',isAuth, breedControllers.getWeaningDate)
router.get('/next-breeding-date',isAuth, breedControllers.getNextBreedingDate)

router.get('/testing', (req, res) => {
    return res.json({success: true, message: 'It has worked'})
})

//Population
router.post('/population', isAuth, populationController.postPopulation)

router.get('/population', isAuth, populationController.getPopulation)

//Book Keeping

router.post('/book-keeping', isAuth, bookKeepingController.postBookkeeping)

router.get('/book-keeping', isAuth, bookKeepingController.getBookkeeping)

module.exports = router
