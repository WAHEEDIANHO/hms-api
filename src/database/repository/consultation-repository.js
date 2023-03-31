const { ConsultationModel } = require("../models");
const { APIError, STATUS_CODES} = require('../../utils/app-errors');


class ConsultationRepository{
    async addConsultation (consultant) {

        try {
            const newConsultation = await ConsultationModel.create(consultant);
            return newConsultation;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Add user to consultation list')
        }
    }

    async getConsultation () {
        console.log("fetching list")
        try {
            const consultation = await ConsultationModel.find().populate('patientId');
            console.log(consultation, "repo")
            return consultation;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'No doctor find')
        }
    }

//    get doctor by Id
    async getDoctorById (id) {
        try {
            const doctor = await ConsultationModel.findById(id);
            return doctor;
        } catch (e) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Doctor not find')
        }
    }

    //    update Doctor
    async updateDoctor (id, update) {
        try {
            const doctor = await ConsultationModel.findByIdAndUpdate(id, update);
            return doctor;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Doctor update fail')
        }
    }

    //    Delete Doctor
    async deleteDoctor (id) {
        try {
            const doctor = await ConsultationModel.findByIdAndDelete(id);
            return doctor;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Doctor update fail')
        }
    }

    // async countDoctor () {
    //     try {
    //         return await ConsultationModel.count();
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}

module.exports = ConsultationRepository