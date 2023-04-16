const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");

class TimeAppointment {
    constructor(client){
        this.TimeAppointment = client.db().collection("timeAppointment");
    }

    // define csdl
    extractConactData(payload){
        const timeAppointment = {
            tieu_de: payload.tieu_de,
            loai_lich: payload.loai_lich,
            thoi_gian: payload.thoi_gian,
            mo_ta: payload.mo_ta,
            ghi_chu: payload.ghi_chu,
            phieu_bao_gia: payload.phieu_bao_gia,
            khach_hang: payload.khach_hang,
            nhan_vien: payload.nhan_vien,
        };

        // remove undefined fields
        Object.keys(timeAppointment).forEach(
            (key) => timeAppointment[key] === undefined && delete timeAppointment[key]
        );
        return timeAppointment;
    }

    async findAll(){
        const result = await this.TimeAppointment.find();
        return result.toArray();
    }

    async findById(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TimeAppointment.findOne(id);
        return result;
    }
    async findByStaff(payload){
        const result = await this.TimeAppointment.find({
            nhan_vien: payload.id
        });
        return result.toArray();
    }

    async create(payload){
        const timeAppointment = this.extractConactData(payload);
        const isExist = await this.TimeAppointment.find({
            nhan_vien: timeAppointment.nhan_vien,
            "thoi_gian.start": { 
                $gte: timeAppointment.thoi_gian.start,
                $lte: timeAppointment.thoi_gian.end
            },
            "thoi_gian.end": { 
                $gte: timeAppointment.thoi_gian.start,
                $lte: timeAppointment.thoi_gian.end
            }
        }).toArray()
        console.log(isExist);
        if(isExist.length == 0){
            const result = await this.TimeAppointment.insertOne(timeAppointment);
            return result;
        }
        return next(
            new ApiError(500, "An error occured while create document")
        )
    }

    async update(id, payload){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const timeAppointment = this.extractConactData(payload);
        const result = await this.TimeAppointment.findOneAndUpdate(
            id,
            { $set: timeAppointment },
            { returnDocument: "after" }
        )
        return result.value;
    }

    async delete(id){
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.TimeAppointment.findOneAndDelete(id);
        return result.value;
    }

}

module.exports = TimeAppointment;