const Request = require("../../db/models/Request");
const Option = require("../../db/models/Option");
const User = require("../../db/models/User");

exports.fetchRequestList = async (req, res, next) => {
  try {
    const request = await Request.find().populate("user");
    // .populate("service");
    res.status(200).json(request);
  } catch (error) {
    console.log(error);
  }
};

exports.fetchRequest = async (requestId, next) => {
  try {
    const request = await Request.findById(requestId).populate("user");
    return request;
  } catch (error) {
    console.log(error);
  }
};
exports.requestOptionFetch = async (req, res, next) => {
  try {
    res.status(200).json(req.Request).populate("user");
  } catch (error) {
    console.log(error);
  }
};

exports.createRequest = async (req, res, next) => {
  try {
    // req.body.owner = req.user._id;

    req.body.user = req.user._id;
    const newRequest = await Request.create(req.body);
    await User.findByIdAndUpdate(
      req.user,
      {
        $push: { requests: newRequest._id },
      },
      { $set: { user: req.body } },
      { new: true, runValidators: true } // returns the updated profile
    );
    res.status(201).json(newRequest);
  } catch (error) {
    console.log(error);
  }
};

exports.updateRequest = async (req, res, next) => {
  try {
    if (req.body.user === req.user._id) {
      const updatedRequest = await Request.findByIdAndUpdate(
        req.Request,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json(updatedRequest);
    } else {
      res.status(401).res.json({ message: "You are Not The Admin" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    if (req.body.user === req.user._id) {
      await req.Request.remove();
      res.status(204).end();
    } else {
      res.status(401).json({ message: "You are Not a the owner" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    // req.body.items.forEach(async (item) => {
    //   const foundProduct = await Product.findById(item.product);
    //   foundProduct.quantity = foundProduct - item.quantity;
    //   const updatedItem = await Option.findByIdAndUpdate(
    //     item.option,
    //     { $inc: { quantity: -item.quantity } }
    //   );
    // });
    const newRequest = await Request.create(req.body);

    // await User.populate({path:"requests"});
    // .populate("option");

    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};
