const mongoose = require('mongoose')
const TrailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String,
    },
    picture: {
        type: String,
        required: true,
    },
    difficultly: {
        required: true,
        enum: ['Easy','Medium','Hard'],
        default: 'Difficultly',
    },
    location: {
        type: String,
        required: true,
        default: 'Location',
    },
    length: {
        type: String,
        required: true,
    },
    routeType: {
        type: String,
        required: true,
        enum: ['Out & Back', 'Loop', 'Point to Point'],
        default: 'Route Type',
    },
    suitability: {
        type: String,
        enum: ['Dog Friendly', 'Kid Friendly', 'Stroller Friendly', 'Wheelchair Friendly', 'Paved', 'Partially Paved'],
        default: 'Suitability',
    },
    attractions: {
        type: String,
        enum: ['Waterfall', 'Views', 'Flowers', 'Lake', 'River', 'Forest', 'Wildlife', 'Beach', 'Cave', 'Hot Springs', 'Historic Site', 'Rails Trails', 'City Walk', 'Pub Walk', 'Event'],
        default: 'Attractions',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })
module.exports = mongoose.model('Trail', TrailSchema)