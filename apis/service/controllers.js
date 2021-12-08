const Service = require("../../db/models/Service");

exports.fetchList = async (req, res, next) => {
  try {
    const serviceList = await Service.find();
    res.status(201).json(serviceList);
  } catch (error) {
    console.log(error);
  }
};
exports.fetchService = async (serviceId, next) => {
  try {
    const services = await Service.findById(serviceId);
    return services;
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    if (req.user.isAdmin === true) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.owner = req.user._id;
      const newService = await Service.create(req.body);
      res.status(201).json(newService);
    } else {
      res.status(401).json({ message: "You are Not The Admin" });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.serviceDetailFetch = async (req, res, next) => {
  console.log("service", req.service.id);
  res.status(200).json(req.service);
};

exports.updateService = async (req, res, next) => {
  try {
    if (req.user.isAdmin === true) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      const updatedService = await Service.findByIdAndUpdate(
        req.service,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ); /// I saw this in the past code but I didn't know for what
      // please Abdallah ASK, if you see this remind me to ask
      res.status(200).json(updatedService);
    } else {
      res.status(401).res.json({ message: "You are Not The Admin" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    if (req.user.isAdmin === true) {
      await req.service.remove();
      res.status(204).end();
    } else {
      res.status(401).json({ message: "You are Not The Admin" });
    }
  } catch (error) {
    next(error);
  }
};
