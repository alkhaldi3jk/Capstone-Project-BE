const Option = require("../../db/models/Option");

exports.optionListFetch = async (req, res, next) => {
  try {
    const options = await Option.find().populate("service");
    return res.status(200).json(options);
  } catch (error) {
    next(error);
  }
};

exports.optionFetch = async (optionId, next) => {
  try {
    const option = await Option.findById(optionId);
    return option;
  } catch (error) {
    next(error);
  }
};

exports.serviceOptionFetch = async (req, res, next) => {
  console.log("option", req.option.id);
  res.status(200).json(req.option);
};

exports.optionUpdate = async (req, res, next) => {
  try {
    if (req.user) {
      const option = await Option.findByIdAndUpdate(req.option, req.body, {
        new: true,
        runValidators: true,
      }).populate("service");
      return res.status(200).json(option);
    } else {
      return res.status(401).json({ message: "you are not the owner" });
    }
  } catch (error) {
    next(error);
  }
};
exports.optionDelete = async (req, res, next) => {
  try {
    await req.option.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
