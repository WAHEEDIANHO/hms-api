const { PatientModel, ApplicationModel } = require("../models")
const { APIError, STATUS_CODES} = require('../../utils/app-errors')


class PatientRepository{
    // Create patient
    async createPatient (patient) {
        const { firstname, lastname } = patient
        try {
            patient.patientId = `${firstname[0]}${lastname[0]}/${Math.floor(Math.random() * 100 + (1000-100))}`
            const newPatient = await PatientModel.create(patient);
            return newPatient;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Patient')
        }
    }

    async applyPatient (applicationForm) {
        try {
            const application = await ApplicationModel.create(applicationForm);
            return application;
        }catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to apply for Patient')
        }
    }

    async submitApplication ({patientId, applicationId}) {
        try {
            const patient = await PatientModel.findById(patientId);
            patient.applications.push(applicationId);
            patient.save();
            return patient;
        }catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to sunmit application')
        }
    }

//    fetch all patient
    async getPatient (query) {
        console.log(query)
        try {
            let advQuery  = { start: 0, end: 0, limit: 0 };

            for( const key of Object.keys(query)) {
                if (key == ('limit' || 'start' || 'end')) {
                    advQuery[key] = query[key];
                    delete query[key];
                }
            }

            console.log("updated", query, advQuery)
            const patients = await PatientModel.find(query).limit(advQuery.limit).sort({'createdAt': -1})
            return patients;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'No patient find')
        }
    }

    async getOnePatient (query) {
        console.log("getOnePatient query ", query)
        try {
            const { userId, patientId } = query
            const patient = await PatientModel.findOne({ userId, _id: patientId });
            return patient;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'No patient find')
        }
    }

//    get patient by Id
    async getPatientById (id) {
        try {
            const patient = await PatientModel.findById(id);
            return patient;
        } catch (e) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Patient not find')
        }
    }

    //    update Patient
    async updatePatient (id, update) {
        try {
            const patient = await PatientModel.findByIdAndUpdate(id, update);
            return patient;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Patient update fail')
        }
    }

    async addPatientReport ({patientId, report}) {
        console.log(patientId, report, "data")
        try {
            const patient = await PatientModel.findById(patientId);
            console.log(patient);
            patient.reports.push(report);
            const updatePatient = await patient.save()
            console.log("patient save successfully", updatePatient)
            return updatePatient
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Patient update fail')
        }
    }


    //    Delete Patient
    async deletePatient (id) {
        try {
            const patient = await PatientModel.findByIdAndDelete(id);
            return patient;
        } catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Patient update fail')
        }
    }

    // async countPatient () {
    //     try {
    //         return await PatientModel.count();
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}

module.exports = PatientRepository