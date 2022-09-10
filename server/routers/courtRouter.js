const CourtController = require('../controllers/CourtController')
<<<<<<< HEAD

const courtRouter = require('express').Router()

courtRouter.get('/', CourtController.getAll)
courtRouter.post('/', CourtController.createCourt)
=======
const courtRouter = require('express').Router()

courtRouter.get('/', CourtController.getAll)
courtRouter.get('/:id', CourtController.getDetail)
courtRouter.post('/', CourtController.createCourt)
courtRouter.put('/:id', CourtController.updateCourt)
courtRouter.delete('/:id', CourtController.deleteCourt)
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3

module.exports = courtRouter