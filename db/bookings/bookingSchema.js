const mongoose = require('mongoose')
const { Schema } = mongoose;

class BookingSchema {
    getSchemas() {
        return new Schema({
            vaccinationCentre: {
                type: Schema.Types.ObjectId, ref: 'VaccinCentre',
                required: true
            },
            schedule: {
                type: Schema.Types.ObjectId, ref: 'Schedule',
                required: true
            },
            status: {
                type: String,
                enum: ['ONGOING', 'FINISH', "CANCEL"],
                default: 'ONGOING'
            },
            user: {
                type: Object,
                required: true
            },
            dateTime: {
                type: Date,
                required: true
            }
        })
    }
}

module.exports = new BookingSchema();