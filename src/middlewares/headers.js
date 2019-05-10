module.exports = (app) => {
    app.use('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type, access_token');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
}