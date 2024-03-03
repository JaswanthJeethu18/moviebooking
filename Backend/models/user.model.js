const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    id: Number,
    discountValue: Number,
  },
  { _id: false }
);

const bookingRequestSchema = new mongoose.Schema(
  {
    reference_number: Number,
    coupon_code: Number,
    show_id: Number,
    tickets: [Number],
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  userid: Number,
  email: String,
  first_name: String,
  last_name: String,
  username: String,
  contact: String,
  password: String,
  role: String,
  isLoggedIn: Boolean,
  uuid: String,
  accesstoken: String,
  coupens: [couponSchema],
  bookingRequests: [bookingRequestSchema],
});

const User = mongoose.model("User", userSchema);
