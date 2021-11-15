"use strict";
const express = require("express");
const router = express.Router();
const ScheduleHandler = require("../core/schedules/schedule.handler");
const logger = require("../shared/logger")("routes:users");
const scheduleHandler = new ScheduleHandler();
const ApiResponse = require("../shared/ApiResponse");
const HttpStatus = require("../shared/HttpStatus");

class ScheduleRouter {
  registerRoutes() {
    router.route("/")
    .post((req, res, next) => {
      const body = req.body;
      const dateFrom = body["dateFrom"];
      const dateTo = body["dateTo"];
      const centreId = body["centreId"];
      scheduleHandler
        .createSchedule(centreId, dateFrom, dateTo)
        .then(() => {
          const apiResponse = new ApiResponse();
          apiResponse
            .setStatus(HttpStatus.HTTP_CREATED)
            .setMessage("Created schedules successfully")
            .build();
          res.status(apiResponse.status).send(apiResponse);
        })
        .catch((err) => {
          next(err);
        });
    });
    router.route('/:centreId')
    .get((req, res, next) => {
        const centreId = req.params["centreId"];
      scheduleHandler
        .getSchedule(centreId)
        .then((result) => {
          const apiResponse = new ApiResponse();
          apiResponse
            .setStatus(HttpStatus.HTTP_OK)
            .setData(result)
            .build();
          res.status(apiResponse.status).send(apiResponse);
        })
        .catch((err) => {
          next(err);
        });
    })
    return router;
  }
}

const scheduleRouter = new ScheduleRouter();
module.exports = scheduleRouter.registerRoutes();
