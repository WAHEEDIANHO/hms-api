const { DoctorRepository } = require("../database");
const { FormatData } = require("../utils");
const { BadRequestError } = require("../utils/app-errors")

class DoctorService {
    constructor() {
        this.repository = new DoctorRepository();
    }

    //create doctor
    async createDoctor (doctorData) {
        try {
            const doctor = await this.repository.createDoctor(doctorData)
            return FormatData(doctor)
        }catch (e) {
            throw e;
        }
    }

    async applyDoctor (applicantForm, doctorId) {
        try {
            const application = await this.repository.applyDoctor(applicantForm)
            const update = await this.repository.submitApplication({ applicationId: application._id, doctorId });
            return FormatData(update)
        } catch (e) {
            throw e
        }
    }
    //receive doctor
    async getDoctor(query) {
        console.log(query)
        try {
            const doctors = await this.repository.getDoctor(query);
            return FormatData(doctors);
        } catch (e) {
            throw new BadRequestError(e.message, e)
        }
    }

    //retrieve doctor by Id
    async getDoctorById(id) {
        try {
            return await this.repository.getDoctorById(id);
        }catch (e) {
            throw e;
        }
    }

    //retrieve user doctor
    async getUserDoctor (userId) {
        try {
            const invoices = this.repository.getDoctor({user: userId});
            return FormatData(invoices);
        } catch (e) {
            throw new BadRequestError(e.message, e)
        }
    }


    async updateDoctor ({ userId, doctorId, update }) {
        console.log("bravo updateDoctor called")
        try {
            const doctor = await this.repository.getOneDoctor({ userId: userId, doctorId: doctorId });
            if (!doctor) console.log(`userId: ${userId}`, `doctorId: ${doctorId}`)
            else {
                const doctorKey = Object.keys(doctor._doc);
                doctorKey.forEach(key => {
                    if(update.hasOwnProperty(key)) {
                        console.log('update has ', key)
                        doctor[key] = update[key]
                    }
                })

                const jb = await this.repository.updateDoctor(doctor._id, doctor);
                console.log(jb)
                return FormatData(jb)
            }

        } catch (e) { throw e}
    }

    async deleteDoctor ({ userId, doctorId}) {
        console.log("bravo1 updateDoctor called")
        try {
            const doctor = await this.repository.getOneDoctor({ userId: userId, doctorId: doctorId });
            if (!doctor) console.log(`userId: ${userId}`, `doctorId: ${doctorId}`)
            else {
                const doctorDel = await this.repository.deleteDoctor(doctor._id)
                console.log(doctorDel)
                return FormatData(doctorDel)
                // const inv = await invoice.save()
            }
        } catch (e) { throw e}
    }
}

module.exports = DoctorService