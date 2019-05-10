let UserModel = require('../app/user')
let jwt = require('jsonwebtoken')
let { key } = require('../env')

let genericResponse = (status, message) => ({
    status,
    message
})

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiRmxhdmlvQWFuZHJlczI0QGdtYWlsLmNvbSIsImlhdCI6MTU1NzUyMjc1MCwiZXhwIjoxNTU3NTI0NTUwfQ.P_9xRbqy71uVSx8QcrSEigy3AM6chlkfV5TkZW1-pqA


module.exports = (app) => {
    app.get('/api/', function(req, res) {
        res.status(200).send(genericResponse(200, 'Documentation not loaded'))
    })

    app.post('/api/register', (req, res) => {
        if (Object.keys(req.body).length !== 0) {
            let user = new UserModel()
            let TokenData = { mail: req.body.mail }
            console.log(req.body)
            user.mail = req.body.mail
            user.name = req.body.name
            user.pass = user.generateHash(req.body.pass)

            user.token = jwt.sign(TokenData, key, {
                expiresIn: 60 * 30,
            })

            user.save().then((doc) => {
                    console.info('new user created: ' + doc)
                    res.status(201).send(genericResponse(201, {...doc._doc }))
                })
                .catch((err) => {
                    console.error(err.message)
                    res.send(genericResponse(400, 'Ha ocurrido un eror con los datos recibidos'))
                })
        } else {
            res.status(400).send(genericResponse(400, 'data not send'))
        }
    })
}