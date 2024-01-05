require('dotenv').config()
const { Sequelize, QueryTypes, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const express = require('express')
const app = express()

app.use(express.json())

// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//     sequelize.close()
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// main()
class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type:DataTypes.TEXT,
        allowNull:false
    },
    likes: {
        type:DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
});

Blog.sync()

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs))
    res.json(blogs)

})

app.get('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(blog){
    console.log(JSON.stringify(blog))
    res.json(blog)
    }else{
        return res.status(400).json({error})
    }
})

app.post('/api/blogs', async (req, res) => {
    //can you build -> save as well
    //create already saves for you

    console.log('req.body: ', req.body)
    try{

    const newBlog = await Blog.create(req.body)
    console.log(JSON.stringify(newBlog))
    return res.json(newBlog)
    }catch(error){
        return res.status(400).json({ error })
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    try{
        const blogDelete = await Blog.findByPk(req.params.id)
        if(blogDelete){
            blogDelete.destroy()

            res.send(204).send()
        } else{
            res.status(404).json({error:'blog not found'})
        }
    }catch(error){
        console.error(error)
        return res.status(500).json({ error: 'internal server error'})
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})