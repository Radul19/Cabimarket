const { Schema, model } = require('mongoose')

const LocationSchema = new Schema({
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    mtype: { type: String, required: true },
    place: { type: String, required: true },
    id: { type: String, required: true }
})

module.exports = model('Location', LocationSchema)