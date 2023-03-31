const { PatientRepository } = require("../database");
const { FormatData } = require("../utils");
const { BadRequestError } = require("../utils/app-errors")
const Console = require("console");

class PatientService {
    constructor() {
        this.repository = new PatientRepository();
    }

    //create patient
    async createPatient (patientData) {
        try {
            const patient = await this.repository.createPatient(patientData)
            return FormatData(patient)
        }catch (e) {
            throw e;
        }
    }

    async applyPatient (applicantForm, patientId) {
        try {
            const application = await this.repository.applyPatient(applicantForm)
            const update = await this.repository.submitApplication({ applicationId: application._id, patientId });
            return FormatData(update)
        } catch (e) {
            throw e
        }
    }
   //receive patient
   async getPatient(query) {
       console.log(query)
       try {
           const patients = await this.repository.getPatient(query);
           return FormatData(patients);
       } catch (e) {
           throw new BadRequestError(e.message, e)
       }
    }

    //retrieve patient by Id
    async getPatientById(id) {
        try {
            return await this.repository.getPatientById(id);
        }catch (e) {
            throw e;
        }
    }

    //retrieve user patient
    async getUserPatient (userId) {
        try {
            const invoices = this.repository.getPatient({user: userId});
            return FormatData(invoices);
        } catch (e) {
            throw new BadRequestError(e.message, e)
        }
    }


    async updatePatient ({ patientId, update }) {
        console.log("bravo updatePatient called")
        try {
            const patient = await this.repository.getOnePatient({patientId: patientId });
            if (!patient) console.log(`patientId: ${patientId}`)
            else {
                    const patientKey = Object.keys(patient._doc);
                    patientKey.forEach(key => {
                        if(update.hasOwnProperty(key)) {
                            console.log('update has ', key)
                            patient[key] = update[key]
                        }
                    })

                const pt = await this.repository.updatePatient(patient._id, patient);
                console.log(pt)
                return FormatData(pt)
            }

        } catch (e) { throw e}
    }

    async addPatientReport ({ patientId, report }) {
        // console.log("bravo updatePatient called")
        try {
            const patient = await this.repository.addPatientReport({patientId, report});
            console.log(patient, "patient")
            if (!patient) console.log(`patientId: ${patientId}`)
            else return FormatData(patient)
        } catch (e) { throw e}
    }

    async deletePatient ({ userId, patientId}) {
        console.log("bravo1 updatePatient called")
        try {
            const patient = await this.repository.getOnePatient({ userId: userId, patientId: patientId });
            if (!patient) console.log(`userId: ${userId}`, `patientId: ${patientId}`)
            else {
                const patientDel = await this.repository.deletePatient(patient._id)
                console.log(patientDel)
                return FormatData(patientDel)
                // const inv = await invoice.save()
            }
        } catch (e) { throw e}
    }
}

module.exports = PatientService