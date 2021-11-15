"use strict";
const logger = require("../../shared/logger")("core:bookingHandler");
const _ = require("lodash");
const db = require("../../db");
const mongoose = require("mongoose");

class BookingHandler {
  async book(data) {
    const centreId = data["centre"];
    const user = data["user"];
    const fin = user["fin"];
    const timeSlotId = data["timeSlotId"];
    const dbSession = await mongoose.startSession();
    await dbSession.withTransaction(
      async () => {
        const ongoingBooking = await db.Booking.findOne({ "user.fin": fin });
        if (!_.isNull(ongoingBooking)) {
          throw new Error("User has booked for vaccination");
        }

        const centre = await db.VaccinCentre.findById(centreId);
        if (_.isNull(centre)) {
          throw new Error("Vacination Centre not found");
        }

        const timeSlot = await db.Schedule.findOne({
          _id: timeSlotId,
          vaccinationCentre: centreId,
        });

        if (_.isNull(timeSlot) || timeSlot.capacity <= timeSlot.used) {
          throw new Error("Time slot is unavailable or fully booked");
        }
        const newBooking = new db.Booking({
          vaccinationCentre: centreId,
          user,
          schedule: timeSlot.id,
          dateTime: timeSlot.timeSlot,
        });
        timeSlot.used = timeSlot.used + 1;
        await timeSlot.save();
        await newBooking.save();
      },
      { writeConcern: "majority", readConcern: "majority" } // majority ensures the casual consistency, this will ensure the situation when 2 users book same time slot
    );
    dbSession.commitTransaction();
    dbSession.endSession();
    return true;
  }

  async bookingDetails(id) {
    const booking = await db.Booking.findById(id).populate("vaccinationCentre");
    if (_.isNull(booking)) {
      throw new Error("Booking not found");
    }
    return booking;
  }

  async listAllBooking(page, limit) {
    return db.Booking.find({}, null, {
      limit: limit,
      skip: page * limit,
    }).populate("vaccinationCentre");
  }

  async update(bookingId, newData) {
    const centreId = newData["centre"];
    const timeSlotId = newData["timeSlotId"];
    const dbSession = await mongoose.startSession();
    await dbSession.withTransaction(
      async () => {
        const booking = await db.Booking.findOne({ _id: bookingId });
        if (_.isNull(booking)) {
          throw new Error("Booking does not exist");
        }

        const centre = await db.VaccinCentre.findById(centreId);
        if (_.isNull(centre)) {
          throw new Error("Vacination Centre not found");
        }

        const timeSlot = await db.Schedule.findOne({
          _id: timeSlotId,
          vaccinationCentre: centreId,
        });

        if (_.isNull(timeSlot) || timeSlot.capacity <= timeSlot.used) {
          throw new Error("Time slot is unavailable or fully booked");
        }
        const currentTimeSlot = booking.schedule;
        await db.Schedule.updateOne(
          { _id: currentTimeSlot },
          { $inc: { used: -1 } }
        );
        await db.Booking.updateOne({_id: bookingId}, {dateTime: timeSlot.timeSlot, schedule: timeSlotId})
        timeSlot.used = timeSlot.used + 1;
        await timeSlot.save();
      },
      { writeConcern: "majority", readConcern: "majority" } // majority ensures the casual consistency, this will ensure the situation when 2 users book same time slot
    );
    dbSession.commitTransaction();
    dbSession.endSession();
    return true;
  }
}
module.exports = BookingHandler;
