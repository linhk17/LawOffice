const { ObjectId } = require("mongodb");

class Matter {
    constructor(client) {
        this.Matter = client.db().collection("matter");
        this.TypeService = client.db().collection("typeService");
        this.Service = client.db().collection("service");
        this.User = client.db().collection("user");
        this.TypePay = client.db().collection("typePay");
        this.TimePay = client.db().collection("timePay");
        this.Task = client.db().collection("task");
        this.Bill = client.db().collection("bill");
    }

    // define csdl
    extractConactData(payload) {
        const matter = {
            ten_vu_viec: payload.ten_vu_viec,
            dieu_khoan_thanh_toan: payload.dieu_khoan_thanh_toan,
            phuong_thuc_tinh_phi: payload.phuong_thuc_tinh_phi,
            chiet_khau_hoa_hong: payload.chiet_khau_hoa_hong,
            mo_ta_vu_viec: payload.mo_ta_vu_viec,
            linh_vuc: payload.linh_vuc,
            dich_vu: payload.dich_vu,
            luat_su: payload.luat_su,
            khach_hang: payload.khach_hang,
            truy_cap: payload.truy_cap,
            cong_viec: payload.cong_viec,
            tai_lieu: payload.tai_lieu,
            phi_co_dinh: payload.phi_co_dinh,
            chi_phi_phat_sinh: payload.chi_phi_phat_sinh,
            lien_he: payload.lien_he,
            status: payload.status,
            tong_tien: payload.tong_tien,
            status_tt: payload.status_tt,
            ngay_lap: payload.ngay_lap
        };

        Object.keys(matter).forEach(
            (key) => matter[key] === undefined && delete matter[key]
        );
        return matter;
    }

    async findAll() {
        const result = await this.Matter.find();
        return result.toArray();
    }

    async findById(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Matter.findOne(id);
        return result;
    }

    // lay vu viec theo trang thai
    async findByStatus(statusP) {
        const result = await this.Matter.find({ status: Number(statusP) });
        return result.toArray();
    }

    // lay vu viec theo id truy cap
    async findByIdAccess(payload) {
        const result = await this.Matter.find({ 'truy_cap.nhan_vien': payload.id })
        return result.toArray();
    }

    async create(payload) {
        const linh_vuc = await this.TypeService.findOne({ _id: payload.linh_vuc });
        const dich_vu = await this.Service.findOne({ _id: new ObjectId(payload.dich_vu) });
        const luat_su = await this.User.findOne({ _id: new ObjectId(payload.luat_su) });
        const khach_hang = await this.User.findOne({ _id: new ObjectId(payload.khach_hang) });
        const phuong_thuc_tinh_phi = await this.TypePay.findOne({ _id: new ObjectId(payload.phuong_thuc_tinh_phi) });
        const dieu_khoan_thanh_toan = await this.TimePay.findOne({ _id: new ObjectId(payload.dieu_khoan_thanh_toan) });
        const vu_viec = {
            ...payload,
            ngay_lap: new Date(payload.ngay_lap),
            linh_vuc: linh_vuc,
            dich_vu: dich_vu,
            luat_su: luat_su,
            khach_hang: khach_hang,
            phuong_thuc_tinh_phi: phuong_thuc_tinh_phi,
            dieu_khoan_thanh_toan: dieu_khoan_thanh_toan,
            status_tt: 0
        }

        const matter = this.extractConactData(vu_viec);
        const result = await this.Matter.insertOne(matter);
        return result;
    }

    async update(id, payload) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const linh_vuc = await this.TypeService.findOne({ _id: payload.linh_vuc });
        const dich_vu = await this.Service.findOne({ _id: new ObjectId(payload.dich_vu) });
        const luat_su = await this.User.findOne({ _id: new ObjectId(payload.luat_su) });
        const khach_hang = await this.User.findOne({ _id: new ObjectId(payload.khach_hang) });
        const phuong_thuc_tinh_phi = await this.TypePay.findOne({ _id: new ObjectId(payload.phuong_thuc_tinh_phi) });
        const dieu_khoan_thanh_toan = await this.TimePay.findOne({ _id: new ObjectId(payload.dieu_khoan_thanh_toan) });
        const vu_viec = {
            ...payload,
            linh_vuc: linh_vuc,
            dich_vu: dich_vu,
            luat_su: luat_su,
            khach_hang: khach_hang,
            phuong_thuc_tinh_phi: phuong_thuc_tinh_phi,
            dieu_khoan_thanh_toan: dieu_khoan_thanh_toan,
        }
        const matter = this.extractConactData(vu_viec);
        const result = await this.Matter.findOneAndUpdate(
            id,
            { $set: matter },
            { returnDocument: "after" }
        );
        return result.value;
    }
    async setStatus_TT(id, payload) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const matter = this.extractConactData(payload);
        const rs = await this.Matter.findOneAndUpdate(
            id,
            { $set: matter },
            { returnDocument: "after" }
        );
        return rs.value
    }

    async setStatus(id, payload) {
        const id_string = id;
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const matter = this.extractConactData(payload);
        const rs = await this.Matter.findOneAndUpdate(
            id,
            { $set: matter },
            { returnDocument: "after" }
        );
        if(payload.status == 2){
            const result = await this.Task.updateMany(
                {status: 0, vu_viec: id_string},
                {$set: {status: 2}}
            )
        }
        return rs.value;
    }

    async delete(id) {
        id = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const result = await this.Matter.findOneAndDelete(id);
        return result.value;
    }
}

module.exports = Matter;