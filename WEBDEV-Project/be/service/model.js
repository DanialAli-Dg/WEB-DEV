const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
  },
    image: {
      type: String,
    },
    price: {
      type: Number,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    salon: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "salons",
      },
    ],
    
    shifts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "shift",
      },
    ],
  }
  // { timestamps: true }
);

const Service = mongoose.model("service", serviceSchema);

module.exports = Service;