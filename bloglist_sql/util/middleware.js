const { JsonWebTokenError } = require("jsonwebtoken")
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id'})
    }else if (error.name === 'SequelizeValidationError') {
        return response.status(500).json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch {
            return res.status(401).json({ error: 'token invalid'})
        }
    }else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const tokenAuthExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.tokenAuth = authorization.substring(7)
        } catch {
            next()
        }
    }
    next()
}
module.exports = {
    errorHandler, 
    unknownEndpoint,
    tokenExtractor,
    tokenAuthExtractor
}