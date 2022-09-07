const router = require('express').Router()
const adminRouter = require('./adminRouter')
const courtRouter = require('./courtRouter')
const customerRouter = require('./customerRouter')

router.use('/admin', adminRouter)
router.use('/customer', customerRouter )

router.use('/courts', courtRouter)

module.exports = router