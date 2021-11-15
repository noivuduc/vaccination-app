"use strict";
const express = require("express");
const router = express.Router();
const VaccinationCentreHandler = require("../core/vaccinationCentre/vaccinationCentre.handler");
const logger = require("../shared/logger")("routes:vaccinationCentre");
const handler = new VaccinationCentreHandler();
const ApiResponse = require("../shared/ApiResponse");
const HttpStatus = require("../shared/HttpStatus");
class VaccinationCentreRoute {
  registerRoutes() {
    router.route("/").get((req, res, next) => {
      const page = req.query.page || 0;
      const limit = req.query.limit | 20;
      handler
        .listAllCentres(page, limit)
        .then((result) => {
          const apiResponse = new ApiResponse();
            apiResponse
              .setStatus(HttpStatus.HTTP_OK)
              .setData(result)
              .build();
            res.status(apiResponse.status).send(apiResponse);
        })
        .catch((error) => {
          console.log("Error while fetching list vaccination centres", error);
          next(error);
        });
    }).post((req, res, next) => {
      const body = req.body;
      handler.createVaccinationCentre(body)
      .then(() => {
        const apiResponse = new ApiResponse();
            apiResponse
              .setStatus(HttpStatus.HTTP_CREATED)
              .setMessage("You have successfully created")
              .build();
            res.status(apiResponse.status).send(apiResponse);
      }).catch((error) => {
        console.log("Error while creating vaccination centre, error");
        next(error);
      });
    });
    return router;
  }
}

const route = new VaccinationCentreRoute();
module.exports = route.registerRoutes();
