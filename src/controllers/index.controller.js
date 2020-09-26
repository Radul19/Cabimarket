const ctrl = {}
const Location = require('../models/Location')
const Product = require("../models/Product")
const {randomNumber} = require("../config/helper")

ctrl.renderIndex = async (req, res) => {

    res.render('index',)
}
ctrl.newMark = async (req, res) => {
    let status = false
    const newLocation = new Location({
        lat: req.params.lat,
        lng: req.params.lng,
        place: req.params.place,
        mtype: req.params.mtype,
        id: randomNumber()
    })
    await newLocation.save()
        .then(res => {
            status = res
        })
    res.send({
        status
    })
}
ctrl.deleteMark = async (req, res) => {
    let status = false
    const findLocation = await Location.findOne({
        lat:req.params.lat,
        lng:req.params.lng,
    })
    await findLocation.deleteOne().then(res=>status=true)
    res.send({
        status
    })
}

ctrl.sendMarks = async (req, res) => {
    const totaLocation = await Location.find()
    const info = JSON.stringify(totaLocation)
    res.send(info)
}

ctrl.findPlace = async (req,res)=>{
    const place = req.params.place
    const placesFound = await Location.find({
        place: {$regex: place}
    })
    res.send(placesFound)
}

ctrl.renderStallPage = async (req,res)=>{
    const stall_id = req.params.stall_id
    const stall = await Location.findOne({id:stall_id})
    res.render("Stall-page",{stall})
}

module.exports = ctrl
