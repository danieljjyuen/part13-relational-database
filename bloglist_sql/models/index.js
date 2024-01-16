const Blog = require('./blog')
const ReadingList = require('./readingList')
const User = require('./user')
const ActiveSession = require('./activeSession')


User.hasMany(Blog)
Blog.belongsTo(User)


User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList })

// Blog.sync({alter: true})
// User.sync({alter: true})

module.exports = {
    Blog,
    User,
    ReadingList,
    ActiveSession
}