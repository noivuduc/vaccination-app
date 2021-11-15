const centreSchema = require('./centreSchema')
const mongoose = require('mongoose')
class CentreModel {
    getDefinition() {
        return mongoose.model('VaccinCentre', centreSchema.getSchemas());
    }
}

module.exports = new CentreModel();