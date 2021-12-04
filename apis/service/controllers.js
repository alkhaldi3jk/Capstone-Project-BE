const Service = require("../../db/models/Services");

exports.fetchList = async (req, res, next) => {
  try {
    const serviceList = await Service.find();
    res.status(201).json(serviceList);
  } catch (error) {
    console.log(error);
  }
};

exports.createList = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.owner = req.user._id;
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    console.log(error);
  }
};
