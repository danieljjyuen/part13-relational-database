const router = require('express').Router()
const {ReadingList} = require('../models/index')
const { tokenExtractor } = require('../util/middleware')

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

router.put('/:id', tokenExtractor, async (req, res) => {
    try{
        const readinglist = await ReadingList.findByPk(req.params.id)
        console.log('readinglist: ' ,readinglist)
        if(readinglist.userId === req.decodedToken.id){
            readinglist.read = true
            await readinglist.save()
            return res.status(200).json(readinglist)
        }else{
           return res.status(400).json({error: 'unauthorized user'})
        }
    }catch(error) {
        console.log(error)
        next()
    }

})

module.exports = router