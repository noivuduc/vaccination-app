'use strict';

const Promise = require('bluebird');
const config = require('config')
const {isEmpty} = require("lodash")
const mongoose = require('mongoose')
const logger = require('../shared/logger')('shared:data:db');
const fs = require('fs');
let options = null;
let uri = `${config.mongo.protocol}://`;

class MongoDB {
    constructor() {
        options = {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        };
        if(!isEmpty(config.mongo.user)) {
            options['user'] = config.mongo.user;
            options['pass'] = config.mongo.pwd;
        }
        uri += `${config.mongo.host}/`;
        options['dbName']=config.mongo.database;

        if (!isEmpty(config.mongo.options)) {
            uri += `?${config.mongo.options}`
        }
        console.log(`Mongodb uri ${uri}`)
    }

    connect() {
        return mongoose.connect(uri, options);
    }


    initModels() {
        console.log('initialize models');
        this.VaccinCentre = require('./centres').getDefinition();
        this.Booking = require('./bookings').getDefinition();
        this.Schedule = require('./schedules').getDefinition();
    }
}

module.exports = new MongoDB();
