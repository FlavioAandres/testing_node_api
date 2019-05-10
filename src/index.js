let express = require('express')
let bodyParser = require('body-parser')
let { SERVER_PORT } = require('./env')
let app = express();

//
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//DB_CONN
require('./database/connection')

//routes
require('./routes/loginRoutes')(app)
require('./routes/usersRoutes')(app)

//middlewares
//middleware auth is managed on userRoutes. 
require('./middlewares/auth')(app)
require('./middlewares/serverInformation')(app)
require('./middlewares/statusFail')(app)


app.listen(SERVER_PORT, () => console.info(`server started on port ${SERVER_PORT}`))