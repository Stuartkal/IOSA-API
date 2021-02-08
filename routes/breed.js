const express = require('express')

const router = express.Router()

const isAuth = require('../middleware/is-auth')

const breedControllers = require('../controllers/breed')
const populationController = require('../controllers/population')
const medicationController = require('../controllers/medication')
const bookKeepingController = require('../controllers/bookkeeping')

//Breeding
router.post('/breeding', isAuth, breedControllers.addBreeding)

router.get('/breedings', isAuth, breedControllers.getBreeding)

router.get('/breeding/:breedingId', isAuth, breedControllers.singleBreeding)

router.delete('/breeding/:breedingId', isAuth, breedControllers.deleteBreeding)

//Notifications
router.get('/kindling-box',isAuth, breedControllers.getKindlingBox)

router.get('/weaning-date',isAuth, breedControllers.getWeaningDate)

router.get('/next-breeding-date',isAuth, breedControllers.getNextBreedingDate)



//Population
router.post('/population', isAuth, populationController.postPopulation)

router.get('/population', isAuth, populationController.getPopulation)

router.delete('/population/:populationId', isAuth,populationController.deletePopulation)

router.get('/population/:populationId', isAuth,populationController.singlePopulation)

//Medication
router.post('/medication', isAuth, medicationController.postMedication)

router.get('/medication', isAuth, medicationController.getMedication)

router.delete('/medication/:medicationId', isAuth,medicationController.deleteMedication)

router.get('/medication/:medicationId', isAuth,medicationController.singleMedication)


//Book Keeping

router.post('/book-keeping', isAuth, bookKeepingController.postBookkeeping)

router.get('/book-keeping', isAuth, bookKeepingController.getBookkeeping)

router.delete('/book-keeping/:bookId', isAuth, bookKeepingController.deleteBookkeeping)

router.get('/book-keeping/:bookId', isAuth, bookKeepingController.singleBookkeeping)

//Revenue

router.get('/revenue',isAuth, bookKeepingController.getRevenue)

module.exports = router
