const db = require("../../db");
const moment = require("moment");
const _ = require("lodash");
class ScheduleHandler {
  async createSchedule(centreId, dateFrom, dateTo) {
    const centre = await db.VaccinCentre.findById(centreId);
    if (_.isNull(centre)) {
      throw new Error("Vacination Centre not found");
    }
    const noOfNurse = centre.numberOfNurse;
    /**
     * We assume that, each vaccination centre will have X nurses
     * operating hour from 8:00 AM to 8:00 PM
     * There are two shifts, one in the morning from 8AM to 2PM, another is from 2PM to 8PM
     * ===> so each time slot (ex: 8:00) will have maximum X / 2 slot available (each nurse will take care of one person)
     */
    const availableSlot = Math.ceil(noOfNurse / 2);
    const start = moment(dateFrom).set("hours", 8);
    const end = moment(dateTo).set("hours", 20);
    if (start.isAfter(end)) {
        throw new Error('Invalid start date')
    }

    if(start.isBefore(moment())) {
        throw new Error('Start date cannot be the past');
    }

    // find latest record
    const latestDate = await db.Schedule.findOne({}, {}, { sort: { 'timeSlot' : -1 } });
    if(!_.isNull(latestDate) && moment(latestDate.timeSlot).isAfter(start)) {
        throw new Error('You have scheduled for this range. Range is overlapped');
    }
    const schedules = [];
    let currentDate = start;
    while (currentDate.isSameOrBefore(end)) {
      const endOfDay = currentDate.clone().set("hours", 20);
      while (currentDate.isSameOrBefore(endOfDay)) {
        schedules.push({
          timeSlot: currentDate.clone(),
          capacity: availableSlot,
          vaccinationCentre: centreId,
        });
        currentDate.add(5, "minutes");
      }
      currentDate.add(1, "day").set(8, "hour");
    }
    await db.Schedule.insertMany(schedules);
  }

  async getSchedule(centreId) {
    return db.Schedule.find({
      vaccinationCentre: centreId,
    }).$where("this.used < this.capacity");
  }
}

module.exports = ScheduleHandler;
