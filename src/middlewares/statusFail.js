module.exports = (app) => {
    app.use((err, req, res, next) => {
        console.log(err.stack)
        res.status(500).send({
            status: 500,
            message: `An error has ocurred`,
            error: err.message,
            trace: 'trace: ' + err.stack
        })
    })
}