module.exports = (app) => {
    app.use('/api/', (req, res, next) => {
        console.info(`${req.method}::${req.path}`)
            // next()
    })
}