const bookingSchema = require('./bookingSchema')
const mongoose = require('mongoose')
class BookingModel {
    getDefinition() {
        return mongoose.model('Booking', bookingSchema.getSchemas());
    }
}

module.exports = new BookingModel();