module.exports = (app) => {
    app.use((err, req, res, next) => {
        res.status(500).send({
            status: 500,
            message: `An error has ocurred`,
            error: err.message,
            trace: 'trace: ' + err.stack
        })
    })
}