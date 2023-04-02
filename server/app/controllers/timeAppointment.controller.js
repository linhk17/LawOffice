const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const TimeAppointment = require("../services/timeAppointment.service")

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const timeAppointment = new TimeAppointment(MongoDB.client);
        documents = await timeAppointment.findAll({});
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find all time appointments")
        );
    }
}

exports.findById = async (req, res, next) => {
    try{
        const timeAppointment = new TimeAppointment(MongoDB.client);
        const document = await timeAppointment.findById(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while find time appointments by id")
        );
    }
};

exports.create = async (req, res, next) => {
    try{
        const timeAppointment = new TimeAppointment(MongoDB.client);
        const document = await timeAppointment.create(req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while creating time appointments")
        );
    }
}

exports.update = async (req, res, next) => {
    try{
        const timeAppointment = new TimeAppointment(MongoDB.client);
        const document = await timeAppointment.update(req.params.id, req.body);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while update time appointments")
        );
    }
}

exports.delete = async (req, res, next) => {
    try{
        const timeAppointment = new TimeAppointment(MongoDB.client);
        const document = await timeAppointment.delete(req.params.id);
        return res.send(document);
    }
    catch(error){
        return next(
            new ApiError(500, "An error occured while delete time appointments")
        );
    }
}