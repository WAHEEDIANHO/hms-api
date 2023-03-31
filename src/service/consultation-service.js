const { ConsultationRepository } = require("../database");
const { FormatData } = require("../utils");
const { BadRequestError } = require("../utils/app-errors")

class ConsultationService {
    constructor() {
        this.repository = new ConsultationRepository();
    }

    //create doctor
    async createConsultation (consultant) {
        try {
            const newConsultant = await this.repository.addConsultation(consultant);
            return FormatData(newConsultant)
        }catch (e) {
            throw e;
        }
    }


    //receive doctor
    async getConsultation() {
        try {
            const consultations = await this.repository.getConsultation();
            console.log(consultations, "service")
            return FormatData(consultations);
        } catch (e) {
            throw new BadRequestError(e.message, e)
        }
    }

    //retrieve doctor by Id
    async getConsultationById(id) {
        try {
            return await this.repository.getConsultationById(id);
        }catch (e) {
            throw e;
        }
    }

    //retrieve user doctor
    async getUserConsultation (userId) {
        try {
            const invoices = this.repository.getConsultation({user: userId});
            return FormatData(invoices);
        } catch (e) {
            throw new BadRequestError(e.message, e)
        }
    }


    async updateConsultation ({ userId, doctorId, update }) {
        console.log("bravo updateConsultation called")
        try {
            const doctor = await this.repository.getOneConsultation({ userId: userId, doctorId: doctorId });
            if (!doctor) console.log(`userId: ${userId}`, `doctorId: ${doctorId}`)
            else {
                const doctorKey = Object.keys(doctor._doc);
                doctorKey.forEach(key => {
                    if(update.hasOwnProperty(key)) {
                        console.log('update has ', key)
                        doctor[key] = update[key]
                    }
                })

                const jb = await this.repository.updateConsultation(doctor._id, doctor);
                console.log(jb)
                return FormatData(jb)
            }

        } catch (e) { throw e}
    }

    async deleteConsultation ({ userId, doctorId}) {
        console.log("bravo1 updateConsultation called")
        try {
            const doctor = await this.repository.getOneConsultation({ userId: userId, doctorId: doctorId });
            if (!doctor) console.log(`userId: ${userId}`, `doctorId: ${doctorId}`)
            else {
                const doctorDel = await this.repository.deleteConsultation(doctor._id)
                console.log(doctorDel)
                return FormatData(doctorDel)
                // const inv = await invoice.save()
            }
        } catch (e) { throw e}
    }
}

module.exports = ConsultationService