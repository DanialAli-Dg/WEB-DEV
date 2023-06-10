const Shift = require("./model");

async function createshift(req, res) {
  try {
    const { start_time, end_time, isActive } = req.body;
    console.log("body", req.body);

    const slotExists = await Shift.findOne({ start_time: start_time });

    if (!slotExists) {
      const shift = await Shift.create([
        {
          start_time,
          end_time,
          isActive,
        },
      ]);
      /*console.log("slot created")  */
      res.send("Slot created");
    } else {
      res.send({
        message: "invalid data",
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getshiftsbyshiftID(req, res) {
  try {
    const { _id } = req.query;
    console.log(req.body);

    const shift = await Shift.findOne({ _id });

    if (!shift) {
      res.send("Invalid details");
    } else {
      res.send({
        message: "successfully fetched data slots",
        data: { shift },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getshiftbyserviceid(req, res) {
  try {
    const { _id } = req.query;
    console.log(req.body);

    const shift = await Shift.find({ _id });

    if (!shift) {
      res.send("Invalid details");
    } else {
      res.send({
        message: "successfully fetched data slots",
        data: { shift },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllShifts(req, res) {
  try {
    const shift = await Shift.find({});
    if (!shift) {
      res.send("Invalid details");
    } else {
      res.send({
        message: "successfully fetched data slots",
        data: { shift },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteshiftsbyshiftid(req, res) {
  try {
    const { _id } = req.body;

    const shift = await Shift.deleteOne({ _id });
    if (!shift) {
      res.send("Invalid shift id");
    } else {
      res.send({
        messsage: "shift deleted",
        data: shift,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createshift,
  getshiftsbyshiftID,
  getshiftbyserviceid,
  deleteshiftsbyshiftid,
  getAllShifts
};
