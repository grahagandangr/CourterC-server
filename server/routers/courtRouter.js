const CourtController = require('../controllers/CourtController')
const courtRouter = require('express').Router()

courtRouter.get('/', CourtController.getAll)
courtRouter.get('/:id', CourtController.getDetail)
courtRouter.post('/', CourtController.createCourt)
courtRouter.put('/:id', CourtController.updateCourt)
courtRouter.delete('/:id', CourtController.deleteCourt)


module.exports = courtRouter