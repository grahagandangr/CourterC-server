const CourtController = require('../controllers/CourtController')

const courtRouter = require('express').Router()

courtRouter.get('/', CourtController.getAll)
courtRouter.post('/', CourtController.createCourt)

module.exports = courtRouter