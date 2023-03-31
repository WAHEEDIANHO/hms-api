const express = require('express');
const { body, validationResult } = require('express-validator');

const ConsultationService = require('../service/consultation-service')
const { initiateError } = require("../utils");
const { STATUS_CODES } = require("../utils/app-errors");


const consultationRouter = () => {

    const router = express.Router();
    const service =new ConsultationService();

    router.route('/')
        .get(async (req, res, next) => {
            // console.log(req.query)
            const { data } = await service.getConsultation(req.query);
            return res.status(200).json(data)
        })

        .post(
            [
                body('patientId', "supply a valid patientId").trim().notEmpty()
            ],
            async (req, res, next) => {

                try {

                    const err = validationResult(req);
                    if(!err.isEmpty()) initiateError(STATUS_CODES.BAD_REQUEST, err.array().map(item => item.param))

                    const { body } = req;
                    console.log(body)
                    const { data } = await service.createConsultation(body);
                    res.status(200).json(data)
                } catch (e) { next(e) }
            })

    router.route('/:id')
        .get(async (req, res, next) => {
            try {
                const  data  = await service.getConsultationById(req.params.id);
                res.status(200).json(data);
            } catch (e) { next(e) }
        })

        .put(async (req, res, next) => {
            try {
                const { data } = await service.updateConsultation({userId: req.user._id.toString(), doctorId: req.params.id, update: req.body });
                res.status(200).json(data);
            }catch (e) {
                next(e)
            }
        })

        .delete(async (req, res, next) => {
            try {
                const  { data } = await service.deleteConsultation({userId: req.user._id.toString(), doctorId: req.params.id}) || {};
                return res.status(200).json(data)
            }catch (e) {
                next(e)
            }
        })

    router.route('/apply')
        .post(
            [
                body(['firstname', 'lastname', 'email', 'phone',
                    'qualification', 'address', 'doctorId'], 'Enter valid data into each field').trim().notEmpty(),
                body('email', 'Enter a valid email address').isEmail(),
            ],
            async (req, res, next) => {
                try {

                    const err = validationResult(req);
                    if(!err.isEmpty()) initiateError(STATUS_CODES.BAD_REQUEST, err.array().map(item => item.param))

                    const { body } = req;
                    console.log(body)
                    const { data } = await service.applyConsultation(body, body.doctorId);
                    res.status(200).json(data)
                } catch (e) { next(e) }
            }
        )
    // .get()



    return router
}

module.exports = consultationRouter