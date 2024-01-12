


const router = require('express').Router()
const { User, Blog, ReadingList }= require('../models/index')

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch(error) {
        return res.status(404).json({error})
    }
})

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId']}
        }
    })
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes:{
            exclude:['createdAt','updatedAt']
        },
        include:[{
            model: Blog,
            as: 'readings',
            attributes: {
                exclude: ['userId']
            },
            through: {
                attributes: []
            },
        }],
    })
    res.json(user)
})

router.put('/:username', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if(user) {
        user.username = req.username
        await user.save()
    }else {
        res.status(404).end()
    }
} )

module.exports = router