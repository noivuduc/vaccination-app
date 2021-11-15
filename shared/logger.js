'use strict';

var debug = require('debug');
const appPrefix = "vaccination"

class Logger {
    getLogger(name) {
        return debug(appPrefix + ":" + name);
    }
}

module.exports = (name) =>{
    return new Logger().getLogger(name);
}
