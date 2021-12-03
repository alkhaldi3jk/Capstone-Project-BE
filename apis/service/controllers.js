const Services = require("../../db/models/Services");



exports.fetchList=async(req,res,next)=>{
    try {
        const serviceList= await Services.find()
        res.status(201).json(serviceList)
    } catch (error) {
        console.log(error)
    }
}

exports.createList=async(req,res,next)=>{
    try {
        const newService = await Services.create(req.body)
        res.status(201).json(newService)
    } catch (error) {
        console.log(error)
    }
}