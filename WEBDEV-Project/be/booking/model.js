const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
   customer: {
      type: mongoose.Schema.ObjectId,
      ref: "customers",
    },
    /*
   createdatTime: {
      hour: { type: Number },
      minutes: { type: Number },
    },
    */
  salon: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "salon",
        // required: true,
      },
    ],
    /*date: {
      type: Date,
      require: true,
      default: Date.now,
    },
   */ 
  services: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "service",
        // required: true,
      },
    ],
    /*
    noOfService: {
      type: Number,
      require: true,
    },
    
    totalAmount: {
      type: Number,
      require: true,
    },
    
    paymentMethod: {
      type: String,
      default: "CASH ON DELIVERY"
      // require: true,
    },
    isActive: {
      type: Boolean,
       default: true,
    },
    isCancelledByCustomer: {
      type: Boolean,
      default: false,
    },
    cancellationReason: {
      type: String,
      default: false,
    },
    bookingStatus: {
      type: String,
      enum: {
        values: ["PENDING", "ACCEPTED", "CANCELLED", "COMPLETED"],
        default: "PENDING",
      },
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      enum: ["PAID", "UNPAID"],
      default: "UNPAID",
    },
    shifts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "shift",
        // required: true,
      },
    ],
    */
  }
  // { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
