const router = require('express').Router()
<<<<<<< HEAD
const adminRouter = require('./adminRouter')
const customerRouter = require('./customerRouter')

router.use('/admin', adminRouter)
=======
const ownerRouter = require('./ownerRouter')
const customerRouter = require('./customerRouter')

router.use('/owner', ownerRouter)
>>>>>>> seedingDummy
router.use('/customer', customerRouter )

module.exports = router