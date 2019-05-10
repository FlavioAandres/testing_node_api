let User = require('../app/user')

let genericResponse = (status, message) => ({
    status,
    message
})

module.exports = (app) => {
    app.get('/api/users/get', function(req, res) {
        User.find({}, (err, users) => {
            if (err) return res.status(404).send(genericResponse(404, 'An error has ocurred'))
            let nwU = users.map((item) => {
                return ({
                    name: item.name,
                    email: item.mail,
                    id: item._id
                })
            })
            res.status(200).send(nwU)
        })
    })

    app.get('/api/users/get/:id', function(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) return res.status(404).send(genericResponse(404, `Id: ${req.params.id} not found. `))
            res.status(200).send(genericResponse(200, user))
        })
    })

    app.put('/api/users/get/:id', function(req, res) {
        User.findById(req.params.id, (err, user) => {
            //ERROR
            if (err) return res.status(404).send(genericResponse(404, `Id: ${req.params.id} not found `))
                //data body
            if (Object.keys(req.body).length !== 0) {
                user.name = (req.body.name === undefined) ? user.name : req.body.name
                user.mail = (req.body.mail === undefined) ? user.mail : req.body.mail
            } else {
                return res.status(400).send(genericResponse(400, 'nothing changed'))
            }
            user.save().then((doc) => {
                res.status(201).send(doc)
            }).catch((err) => {
                console.error(err.message)
                res.send(genericResponse(400, 'data send by user is wrong'))
            })
        })
    })

}