let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let defaultStringField = {
    'type': String,
    'required': true,
}

let userSchema = mongoose.Schema({
    mail: defaultStringField,
    name: defaultStringField,
    token: String,
    pass: defaultStringField,
    created_at: {
        type: Date,
        default: Date.now,
        require: false,
    },
})

// hash the password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('user', userSchema)