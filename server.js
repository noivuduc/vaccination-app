'use strict';
const express = require('express');
const logger = require('./shared/logger')('server');
const app = express();
const config = require('config');
const db = require('./db');





//configure middlewares
const middlewares = require('./middlewares')(app);
middlewares.configureMiddlewares();


//configure routes
const routerIndex = require('./routes')(app);
routerIndex.registerRoutes();

//configure general error handler
const generalErrorHandler = require('./shared/generalErrorHandler');
app.use(generalErrorHandler.handleError);

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development'

db.connect()
.then(() => {
    logger(`Connected to DB`)
    db.initModels()
    app.listen(port, () => {
        console.log(`Running in: ${env} and listening on port: ${port}`)  
    });
})
.catch((error) => {
    console.error('@error', error);
    process.exit();
});
