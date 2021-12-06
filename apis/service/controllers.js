const Service = require("../../db/models/Service");

exports.fetchList = async (req, res, next) => {
  try {
    const serviceList = await Service.find();
    res.status(201).json(serviceList);
  } catch (error) {
    console.log(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    if (req.user.isAdmis === true) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.owner = req.user._id;
      const newService = await Service.create(req.body);
      res.status(201).json(newService);
    } else {
      res.status(401).json({ message: "you're not an Admin" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      const updatedService = await Service.findByIdAndUpdate(req.body, {
        new: true,
        runValidators: true,
      }); /// I saw this in the past code but I didn't know for what
      // please Abdallah ASK, if you see this remind me to ask
      res.status(200).json(updatedService);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    await req.Service.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
