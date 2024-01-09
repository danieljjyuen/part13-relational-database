const router = require('express').Router()
const {tokenExtractor} = require('../util/middleware')
const { Blog,User } = require('../models/index')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: {exclude: ['userId']},
        include: {
            model: User,
            attributes: ['name']
        }
    })
    console.log(JSON.stringify(blogs))
    res.json(blogs)

})

router.get('/:id', blogFinder, async (req, res) => {
    if(req.blog){
    console.log(JSON.stringify(req.blog))
    res.json(req.blog)
    }else{
        return res.status(400).json({error})
    }
})

router.post('/', tokenExtractor, async (req, res) => {
    //can you build -> save as well
    //create already saves for you

    console.log('req.body: ', req.body)
    try{
        const user = await User.findByPk(req.decodedToken.id)
        const newBlog = await Blog.create({...req.body, userId: user.id })
        console.log(JSON.stringify(newBlog))
        return res.json(newBlog)
    }catch(error){
        return res.status(400).json({ error })
    }
})

router.delete('/:id', blogFinder, tokenExtractor,  async (req, res) => {
    try{
        if(req.blog){
            if(req.blog.userId===req.decodedToken.id){
            req.blog.destroy()
            res.send(204).send()
            }else {
                return res.status(401).json({ error: 'unauthorized user' })
            }
            
        } else{
            res.status(404).json({error:'blog not found'})
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({ error: 'internal server error'})
    }
})

router.put('/:id', blogFinder, async (req, res) => {
    if(req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router