const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    othername: { type: String },
    phone: { type: String, required: true, min: 0 },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    // applications: [{type: Schema.Types.ObjectId, ref: 'application', unique: true}]
}, { timestamps: true })

module.exports = mongoose.model("doctor", doctorSchema)