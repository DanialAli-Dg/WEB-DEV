const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const salonSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      require: true,
      unique: true,
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
    password: {
      type: String,
      require: true,
    },
    phoneNo: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
   /* otp: {
      type: Number,
    },
    isOtpVerified: {
      type: Boolean,
    },
    */
    services: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "service",
        default: [],
      },
    ],
  }
  
);

salonSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Salon = mongoose.model("salon", salonSchema);

module.exports = Salon;
