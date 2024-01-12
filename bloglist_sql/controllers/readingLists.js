const router = require('express').Router()
const {ReadingList} = require('../models/index')

router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        const readingList = await ReadingList.create(req.body)
        res.status(201).json(readingList)
    }catch(error) {
        console.log(error)
        next()
    }
})

module.exports = router