const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);

module.exports.getUser = function(username) {
    return User.findOne({ username: username });
};

module.exports.addUser = function(newUser) {
    return newUser.save();
};
