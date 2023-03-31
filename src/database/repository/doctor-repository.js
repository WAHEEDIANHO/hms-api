const { DoctorModel, ApplicationModel } = require("../models")
const { APIError, STATUS_CODES} = require('../../utils/app-errors')


class DoctorRepository{
    // Create doctor
    async createDoctor (doctor) {
        const { firstname, lastname } = doctor
        try {
            const newDoctor = await DoctorModel.create(doctor);
            return newDoctor;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Doctor')
        }
    }
    //    fetch all doctor
    async getDoctor (query) {
        console.log(query)
        try {
            let advQuery = { start: 0, end: 0, limit: 0 };

            for( const key of Object.keys(query)) {
                if (key == ('limit' || 'start' || 'end')) {
                    advQuery[key] = query[key];
                    delete query[key];
                }
            }

            console.log("updated", query, advQuery)
            const doctors = await DoctorModel.find(query)?.limit(advQuery.limit).sort({'createdAt': -1})
            console.log(doctors)
            return doctors;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'No doctor find')
        }
    }

    async getOneDoctor (query) {
        console.log("getOneDoctor query ", query)
        try {
            const { userId, doctorId } = query
            const doctor = await DoctorModel.findOne({ userId, _id: doctorId });
            return doctor;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'No doctor find')
        }
    }

//    get doctor by Id
    async getDoctorById (id) {
        try {
            const doctor = await DoctorModel.findById(id);
            return doctor;
        } catch (e) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Doctor not find')
        }
    }

    //    update Doctor
    async updateDoctor (id, update) {
        try {
            const doctor = await DoctorModel.findByIdAndUpdate(id, update);
            return doctor;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Doctor update fail')
        }
    }

    //    Delete Doctor
    async deleteDoctor (id) {
        try {
            const doctor = await DoctorModel.findByIdAndDelete(id);
            return doctor;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Doctor update fail')
        }
    }

    // async countDoctor () {
    //     try {
    //         return await DoctorModel.count();
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}

module.exports = DoctorRepository