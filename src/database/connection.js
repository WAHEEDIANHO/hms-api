const mongoose = require('mongoose');
const { MONGO_URL, MONG0_DEV } = require('../config')

module.exports = async () => {
    try {
        await mongoose.connect(MONG0_DEV, {
            useNewUrlParser: true
        });
        console.log("db connected")
    }catch (e) {
        console.log('Error ============')
        console.log(e);
        process.exit(1);
    }
}