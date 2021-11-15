const bookingRouter = require('./bookings');
const vaccinationRouter = require('./vaccinationCentre')
const scheduleRouter = require('./schedules')
class RouterIndex {
    constructor(app) {
        this.app = app;
    }
    registerRoutes() {
        this.app.use('/booking', bookingRouter);
        this.app.use('/centre', vaccinationRouter);
        this.app.use('/schedule', scheduleRouter);
    }
}

module.exports = (app) => { return new RouterIndex(app) };