let mongoose = require('mongoose')
let { DB_SERVER, DB_NAME, DB_PORT } = require('./../env')
class ConnectionDB {
    constructor() {
        this.connect()
    }
    connect() {
        mongoose.connect(`mongodb://${DB_SERVER}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true, useFindAndModify: false })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
                console.error(err)
            })
    }
}

module.exports = new ConnectionDB()