"use strict";
const express = require("express");
const router = express.Router();
const BookingHandler = require("../core/booking/booking.handler");
const logger = require("../shared/logger")("routes:users");
const bookingHandler = new BookingHandler();
const ApiResponse = require("../shared/ApiResponse");
const HttpStatus = require("../shared/HttpStatus");

class BookingRouter {
  registerRoutes() {
    router
      .route("/")
      .post((req, res, next) => {
        const body = req.body;
        bookingHandler
          .book(body)
          .then((result) => {
            const apiResponse = new ApiResponse();
            apiResponse
              .setStatus(HttpStatus.HTTP_CREATED)
              .setMessage("You have successfully booked your slot")
              .build();
            res.status(apiResponse.status).send(apiResponse);
          })
          .catch((error) => {
            console.log("Error while place booking!", error);
            next(error);
          });
      })
      .get((req, res, next) => {
        const page = req.query.page || 0;
        const limit = req.query.limit | 20;
        bookingHandler
          .listAllBooking(page, limit)
          .then((result) => {
            const apiResponse = new ApiResponse();
            apiResponse.setStatus(HttpStatus.HTTP_OK).setData(result).build();
            res.status(apiResponse.status).send(apiResponse);
          })
          .catch((error) => {
            console.log("Error while place booking!", error);
            next(error);
          });
      });
    router
      .route("/:id")
      .get((req, res, next) => {
        const bookingId = req.params.id;
        bookingHandler
          .bookingDetails(bookingId)
          .then((result) => {
            const apiResponse = new ApiResponse();
            apiResponse.setStatus(HttpStatus.HTTP_OK).setData(result).build();
            res.status(apiResponse.status).send(apiResponse);
          })
          .catch((error) => {
            console.log("Error while place booking!", error);
            next(error);
          });
      })
      .put((req, res, next) => {
        const bookingId = req.params.id;
        bookingHandler
          .update(bookingId, req.body)
          .then(() => {
            const apiResponse = new ApiResponse();
            apiResponse.setStatus(HttpStatus.HTTP_OK).setMessage('You have successfully re-scheduled your appointment').build();
            res.status(apiResponse.status).send(apiResponse);
          })
          .catch((error) => {
            console.log("Error while place booking!", error);
            next(error);
          });
      });
    return router;
  }
}

const bookingRouter = new BookingRouter();
module.exports = bookingRouter.registerRoutes();
