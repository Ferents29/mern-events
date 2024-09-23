const {Schema} = require("mongoose");
const mongoose = require("mongoose");


const Event = new Schema({
    title: { type:String, required:true },
    description: { type:String, required:true },
    date: { type:String, required:true },
    organizer: { type:String, required:true },
    fromGetInfo: { type:String },
    users: {type: Array},
    createdAt: { type:Date },
    updatedAt: { type:Date },
});

module.exports = mongoose.model('Event', Event);