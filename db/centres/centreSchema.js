const mongoose = require('mongoose')
const { Schema } = mongoose;

class CentreSchema {
    getSchemas() {
        return new Schema({
            name: {
                type: String,
                required: true,
                max: 500
            },
            address: {
                type: Object,
                required: true
            },
            numberOfNurse: {
                type: Number,
                required: true
            }
        })
    }
}

module.exports = new CentreSchema();