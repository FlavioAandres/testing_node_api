let { key } = require('../env')
let jwt = require('jsonwebtoken')

module.exports = (app) => {
    app.use('*', (req, res, next) => {
        console.log('trying authentication')
        let token = req.headers['token']
        console.info(req.headers)
        if (!token) return res.status(401).send({ error: 'no token found' })
        jwt.verify(token, key, (err, decoded) => {
            if (err) return res.status(402).send({ error: 'token isn valid' })
            next()
        })
    })
}