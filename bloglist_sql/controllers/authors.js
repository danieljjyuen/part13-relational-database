const router = require('express').Router()
const { Blog } = require('../models/index')
const { sequelize } = require('../util/db')

router.get('/', async (req, res ) => {
    const authors = await Blog.findAll({
        order:[
            ['likes', 'DESC']
        ],
        attributes: [
            [sequelize.col('author'), 'author'],
            [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
        ],
        group:['author']
    })
    res.json(authors)
})

module.exports = router