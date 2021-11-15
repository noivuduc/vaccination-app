'use strict';

const logger = require('../shared/logger')('common:generalErrorHandler');
const HttpStatus = require('./HttpStatus')
const ApiResponse = require('./ApiResponse');
class GeneralErrorHandler {
    handleError(code, req, res, next) {
        const apiResponse = new ApiResponse();
        if (code) {
            if (code instanceof Error) {
                logger(`unhandled Error ${code}`);
                apiResponse.setStatus(HttpStatus.HTTP_BAD_REQUEST).setMessage(code.message);
            } else {
                logger(`unhandle error`);
                apiResponse.setStatus(HttpStatus.HTTP_SERVER_ERROR).setMessage('UNHANDLED_ERROR');
            }
        } else {
            logger(`unhandle error`);
            apiResponse.setStatus(HttpStatus.HTTP_SERVER_ERROR).setMessage('UNHANDLED_ERROR');
        }
        res.status(apiResponse.status).send(apiResponse);
    };
}

module.exports = new GeneralErrorHandler();