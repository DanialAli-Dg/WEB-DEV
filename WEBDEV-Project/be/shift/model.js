const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
  {
    start_time: {
      type: String,
      require: true,
    },
    end_time: {
      type: String,
      require: true,
    },
    
    isActive: {
      type: Boolean,
      default: true,
    },
    
  }
  // { timestamps: true }
);

const Shift = mongoose.model("shift", shiftSchema);

module.exports = Shift;