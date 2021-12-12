const Detail = require("../../db/models/Detail");

exports.detailListFetch = async (req, res, next) => {
  try {
    const details = await Detail.find()
    .populate("service");
    return res.json(details);
  } catch (error) {
    next(error);
  }
};

exports.detailFetch = async (detailId, next) => {
  try {
    const detail = await Detail.findById(detailId);
    return detail;
  } catch (error) {
    next(error);
  }
};

exports.serviceDetailFetch = async (req, res, next) => {
  console.log("detail", req.detail.id);
  res.status(200).json(req.detail);
};

exports.detailUpdate = async (req, res, next) => {
  try {
    if (req.user) {
      const detail = await Detail.findByIdAndUpdate(req.detail, req.body, {
        new: true,
        runValidators: true,
      }).populate("service");
      return res.status(200).json(detail);
    } else {
      return res.status(401).json({ message: "you are not the owner" });
    }
  } catch (error) {
    next(error);
  }
};
exports.detailDelete = async (req, res, next) => {
  try {
    await req.detail.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
