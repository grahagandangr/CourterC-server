const router = require('express').Router()
const adminRouter = require('./adminRouter')
const customerRouter = require('./customerRouter')

router.use('/admin', adminRouter)
router.use('/customer', customerRouter )

module.exports = router