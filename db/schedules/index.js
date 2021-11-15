const scheduleSchema = require('./scheduleSchema')
const mongoose = require('mongoose')
class ScheduleModel {
    getDefinition() {
        return mongoose.model('Schedule', scheduleSchema.getSchemas());
    }
}

module.exports = new ScheduleModel();