const Seller = require("../models/Seller");

exports.isAdmin =async (req, res, next) => {
  let sellerId = req.seller._id;
  console.log(sellerId);

  let seller;

  try {
    seller = await Seller.findById(sellerId);
  } catch (err) {
      console.log(err);
    return res.status(404).json({ message: "Seller not found" });
  }

  if (seller.role !== "admin") {
    return res
      .status(403)
      .json({
        message: `Role (${req.user.role}) is not allowed to access this resource`,
      });
  }

  next();
};
