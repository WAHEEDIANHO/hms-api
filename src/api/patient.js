const express = require('express');
const { body, validationResult } = require('express-validator');

const PatientService = require('../service/patient-service')
const { initiateError } = require("../utils");
const { STATUS_CODES } = require("../utils/app-errors");


const patientRouter = () => {

    const router = express.Router();
    const service =new PatientService();

    router.route('/')
        .get(async (req, res, next) => {
            // console.log(req.query)
            const { data } = await service.getPatient(req.query);
            return res.status(200).json(data)
        })

        .post(
            [
                body(['firstname', 'lastname', 'email',
                'phone', 'weight', 'height', 'dob', 'address', 'gender'], 'Enter valid data into each field').trim().notEmpty(),
                body('email', 'Enter a valid email address').isEmail(),
                body(['weight', 'height']).isNumeric().custom((val, {req}) => {
                    if(Number(val) <= 0) throw new Error("Negative value not accepted")
                    return true
                })
            ],
            async (req, res, next) => {

            try {

                const err = validationResult(req);
                if(!err.isEmpty()) initiateError(STATUS_CODES.BAD_REQUEST, err.array().map(item => item.param))

                const { body } = req;
                console.log(body)
                const { data } = await service.createPatient(body);
                res.status(200).json(data)
            } catch (e) { next(e) }
        })

    router.route('/:id')
        .get(async (req, res, next) => {
            try {
                const  data  = await service.getPatientById(req.params.id);
                res.status(200).json(data);
            } catch (e) { next(e) }
        })

        .put(async (req, res, next) => {
            try {
                const { data } = await service.updatePatient({patientId: req.params.id, update: req.body });
                res.status(200).json(data);
            }catch (e) {
                next(e)
            }
        })

        .delete(async (req, res, next) => {
            try {
                const  { data } = await service.deletePatient({userId: req.user._id.toString(), patientId: req.params.id}) || {};
                return res.status(200).json(data)
            }catch (e) {
                next(e)
            }
        })

    router.route('/:id/report')
        .post(async (req, res, next) => {
            try {
                console.log(req.params.id, "params")
                const data  = await service.addPatientReport({patientId: req.params.id, report: req.body });
                res.status(200).json(data);
            }catch (e) {
                next(e)
            }
        }
    )

    router.route('/apply')
        .post(                [
                body(['firstname', 'lastname', 'email', 'phone',
                    'qualification', 'address', 'patientId'], 'Enter valid data into each field').trim().notEmpty(),
                body('email', 'Enter a valid email address').isEmail(),
            ],
                async (req, res, next) => {
                    try {

                        const err = validationResult(req);
                        if(!err.isEmpty()) initiateError(STATUS_CODES.BAD_REQUEST, err.array().map(item => item.param))

                        const { body } = req;
                        console.log(body)
                        const { data } = await service.applyPatient(body, body.patientId);
                        res.status(200).json(data)
                    } catch (e) { next(e) }
            }
        )
    // .get()



    return router
}

module.exports = patientRouter