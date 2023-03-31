const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    othername: { type: String },
    phone: { type: String, required: true, min: 0 },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    patientId: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true, min: 0},
    height: { type: Number, required: true, min: 0},
    reports: [{ diagnosis: String, drug: [{ type: String }] }]
}, { timestamps: true })

module.exports = mongoose.model("patient", patientSchema)