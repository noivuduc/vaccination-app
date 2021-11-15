const mongoose = require('mongoose')
const { Schema } = mongoose;

class ScheduleSchema {
    getSchemas() {
        return new Schema({
            timeSlot: {
                type: Date,
                required: true
            },
            capacity: {
                type: Number,
                required: true
            },
            used: {
                type: Number,
                required: true,
                default: 0
            },
            vaccinationCentre: {
                type: Schema.Types.ObjectId, ref: 'VaccinCentre',
                required: true
            },
        })
    }
}

module.exports = new ScheduleSchema();