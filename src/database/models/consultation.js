const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consultationSchema = new Schema({
    patientId: {type: Schema.Types.ObjectId, ref: 'patient', required: true}
}, { timestamps: true })

module.exports = mongoose.model('consultation', consultationSchema)