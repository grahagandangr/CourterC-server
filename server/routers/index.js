const router = require('express').Router()
const ownerRouter = require('./ownerRouter')
const customerRouter = require('./customerRouter')

router.use('/owner', ownerRouter)
router.use('/customer', customerRouter )

router.use('/courts', courtRouter)

module.exports = router