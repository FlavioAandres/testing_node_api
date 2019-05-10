let express = require('express')
let bodyParser = require('body-parser')
let { SERVER_PORT } = require('./env')
let connection = require('./database/connection')
let app = express();

//
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
require('./routes/loginRoutes')(app)
require('./routes/usersRoutes')(app)

//middlewares
require('./middlewares/serverInformation')(app)
require('./middlewares/statusFaild')(app)




app.listen(SERVER_PORT, () => console.info(`server started on port ${SERVER_PORT}`))