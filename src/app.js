const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');


const ErrorHandler = require('./utils/error-handler')
const { doctorRouter, patientRouter, userRouter, consultationRouter} = require('./api')

// const indexRouter = require('./routes');
// const usersRouter = require('./routes/users');

module.exports = async (app) => {
    app.use(cors())
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(passport.initialize());
// app.use(express.static(path.join(__dirname, 'public')));


/***************************************************************
 ******************* APIs *************************************
 ***************************************************************/

    app.use('/api/user', userRouter());
    app.use('/api/patient', patientRouter());
    app.use('/api/doctor', doctorRouter());
    app.use('/api/consultation', consultationRouter());

/**************************** End ***************************/


app.use(ErrorHandler)

}




