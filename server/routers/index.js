const router = require('express').Router()
<<<<<<< HEAD
const ownerRouter = require('./ownerRouter')
const customerRouter = require('./customerRouter')
const courtRouter = require('./courtRouter')

router.use('/owner', ownerRouter)
=======
const adminRouter = require('./adminRouter')
const courtRouter = require('./courtRouter')
const customerRouter = require('./customerRouter')

router.use('/admin', adminRouter)
>>>>>>> 858c32a4aee68f060962c5eb1de571c398608dd3
router.use('/customer', customerRouter )

router.use('/courts', courtRouter)

module.exports = router