const express = require('express')

const router = express.Router()

const isAuth = require('../middleware/is-auth')

const breedControllers = require('../controllers/breed')
const populationController = require('../controllers/population')
const bookKeepingController = require('../controllers/bookkeeping')


router.post('/breeding',isAuth,breedControllers.addBreeding)

router.get('/breedings',isAuth,breedControllers.getBreeding)

router.get('/breeding/:breedingId',isAuth,breedControllers.singleBreeding)

router.delete('/breeding/:breedingId',isAuth,breedControllers.deleteBreeding)

//Population
router.post('/population',isAuth,populationController.postPopulation)

router.get('/population',isAuth,populationController.getPopulation)

//Book Keeping

router.post('/book-keeping',isAuth,bookKeepingController.postBookkeeping)

router.get('/book-keeping',isAuth,bookKeepingController.getBookkeeping)

module.exports = router