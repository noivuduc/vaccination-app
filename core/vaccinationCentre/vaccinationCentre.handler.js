const db = require('../../db')
class VaccinationCentreHandler {
    async listAllCentres(page, limit) {
        return db.VaccinCentre.find({}, null, {limit, skip: page * limit});
    }

    async createVaccinationCentre(data) {
        return new db.VaccinCentre(data).save();
    }
}

module.exports = VaccinationCentreHandler;