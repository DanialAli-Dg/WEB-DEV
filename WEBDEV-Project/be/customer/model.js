const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phoneNo: {
      type: "String",
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },
    bookings: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "booking",
        default: [],
      },
    ],
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: null
    },
    forgotPasswordOTP: {
      type: Number,
      default: null
    }
  }
  // { timestamps: true }
);

customerSchema.pre("save", function (next) {
  console.log(this.password)
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
