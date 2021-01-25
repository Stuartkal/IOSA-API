const BookKeeping = require('../modals/bookKeeping')
const User = require('../modals/user')

exports.postBookkeeping = (req, res, next) => {
    const food = req.body.food
    const medication = req.body.medication
    const salaries = req.body.salaries
    const allowances = req.body.allowances
    const miscellaneous = req.body.miscellaneous
    const animalsBought = req.body.animalsBought
    const rabbitSales = req.body.rabbitSales
    const farmVisits = req.body.farmVisits
    const foodSales = req.body.foodSales
    const stockFood = req.body.stockFood
    const stockAnimals = req.body.stockAnimals
    const stockMedication = req.body.stockMedication

    let creator

    const book_Keeping = new BookKeeping({
        food: food,
        medication: medication,
        salaries: salaries,
        allowances: allowances,
        miscellaneous: miscellaneous,
        animalsBought: animalsBought,
        rabbitSales: rabbitSales,
        farmVisits: farmVisits,
        foodSales: foodSales,
        stockFood: stockFood,
        stockAnimals: stockAnimals,
        stockMedication: stockMedication,

        creator: req.userId,
    })

    book_Keeping
        .save()
        .then((result) => {
            return User.findById(req.userId)
        })
        .then((user) => {
            creator = user
            user.bookkeeping.push(book_Keeping)
            return user.save()
        })
        .then((result) => {
            res.status(201).json({
                message: 'Book Keeping Record added',
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

exports.getBookkeeping = (req, res, next) => {
    const query = { creator: req.userId }
    BookKeeping.find(query)
        .then((book) => {
            res.status(200).json({
                message: 'Book Keeping Records fetched Successfully',
                bookkeeping: book,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteBookkeeping = (req, res, next) => {
    const bookId = req.params.bookId

    BookKeeping.findById(bookId)
        .then((book) => {
            if (!book) {
                const error = new Error('Cannot find book keeping record')
                error.statusCode = 404
                throw error
            }
            if (book.creator.toString() !== req.userId) {
                const error = new Error('Not Authorized to delete book keeping record')
                error.statusCode = 403
                throw error
            }
            return BookKeeping.findByIdAndRemove(bookId)
        })
        .then((result) => {
            return User.findById(req.userId)
        })
        .then((user) => {
            user.bookkeeping.pull(bookId)
            return user.save()
        })
        .then((result) => {
            // console.log(result)
            res.status(200).json({
                message: 'Book Keeping Record Deleted Successfully',
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.singleBookkeeping = (req, res, next) => {
    const bookId = req.params.bookId
    BookKeeping.findById(bookId)
        .then((book) => {
            res.status(200).json({
                message: 'Book Keeping Record Fetched Successfully',
                bookkeeping: book,
            })
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}
