const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    owner_id : { type: String, required: true }
})

module.exports = model('Products', ProductSchema)