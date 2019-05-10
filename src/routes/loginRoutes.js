let UserModel = require('../app/user')

let genericResponse = (status, message) => ({
    status,
    message
})


module.exports = (app) => {
    app.get('/api/', function(req, res) {
        res.status(200).send(genericResponse(200, 'Documentation not loaded'))
    })

    app.post('/api/register', (req, res) => {
        let user = new UserModel()
        user.mail = req.body.mail
        user.name = req.body.name
        user.pass = user.generateHash(req.body.pass)

        user.save().then((doc) => {
                console.info('new user created: ' + doc)
                res.status(201).send(genericResponse(201, {...doc }))
            })
            .catch((err) => {
                console.error(err.message)
                res.send(genericResponse(400, 'Ha ocurrido un eror con los datos recibidos'))
            })
    })
}