const router = require('express').Router()
const { tokenAuthExtractor } = require('../util/middleware')
const { ActiveSession } = require('../models/index')

router.post('/', tokenAuthExtractor, async (req, res, next) => {
    try {
        const currentSession = await ActiveSession.findOne({
            where: {token: req.tokenAuth}
        }) 
       
        currentSession.destroy()
        res.status(204).end()
    } catch(error) {
        console.log(error)
        next()
    }
})

module.exports = router