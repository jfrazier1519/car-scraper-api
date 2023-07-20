const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },

})

module.exports = mongoose.model('Car', carSchema);