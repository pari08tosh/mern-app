const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);

module.exports.getItems = function() {
    return Item.find().sort({ date: -1 });
}

module.exports.checkItem = function(name) {
    return Item.findOne({name: name});
}

module.exports.insertItem = function(newItem) {
    return newItem.save();
}