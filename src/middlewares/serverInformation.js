module.exports = (app) => {
    app.use(function(req, res, next) {
        console.info(`${req.method}::${req.path}`)
        next()
    })
}