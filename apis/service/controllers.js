const Service = require("../../db/models/Service");
const Option = require("../../db/models/Option");

exports.fetchList = async (req, res, next) => {
  try {
    const serviceList = await Service.find().populate("option");
    res.status(200).json(serviceList);
  } catch (error) {
    console.log(error);
  }
};

exports.fetchService = async (serviceId, next) => {
  try {
    const service = await Service.findById(serviceId).populate("option");
    return service;
  } catch (error) {
    console.log(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    if (req.user.isAdmin === true) {
      if (req.file) {
        // /media/imagename.jpg
        // req.body.image = `/${req.file.path}`;
        req.body.image = `/${req.file.path}`;
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
exports.createServiceOption = async (req, res, next) => {
  // check if the signed in user is the owner of this service
  try {
    // if (!req.user._id.equals(req.service.owner._id)) {
    //   return next({
    //     status: 401,
    //     message: "You're not the owner!!!",
    //   });
    // }

    req.body.service = req.params.serviceId;
    const newServiceOption = await Option.create(req.body);
    await Service.findByIdAndUpdate(req.service, {
      $push: { option: newServiceOption._id },
    });
    return res.status(201).json(newServiceOption);
  } catch (error) {
    next(error);
  }
};
exports.serviceOptionFetch = async (req, res, next) => {
  try {
    res.status(200).json(req.Service);
  } catch (error) {
    console.log(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    if (req.user.isAdmin === true) {
      if (req.file) {
        req.body.image = `/${req.file.path}`;
      }
      const updatedService = await Service.findByIdAndUpdate(
        req.Service,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
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
      await req.Service.remove();
      res.status(204).end();
    } else {
      res.status(401).json({ message: "You are Not The Admin" });
    }
  } catch (error) {
    next(error);
  }
};
