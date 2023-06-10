const Booking = require("./model");
const Service = require("../service/model");
const Customer = require("../customer/model");

async function createBooking(req, res) {
  try {
    const {
      customerName,
      serviceId,
      slots,
      payment_method,
      salonId,
      //totalAmount,
     // bookingStatus,
      //paymentStatus,
    } = req.body;

    if(!serviceId){
      res.status(400).send("Service not found")
    }
    else{
      let service = await Service.findOne({_id: serviceId});
      console.log('service', service);

      let tempCustomer = await Customer.findOne({username: customerName})
      if(!tempCustomer){
        res.status(400).send("invalid customer, sign in or sign up please")
      }
      else {
        const booking = await Booking.create([
          {
            customer: tempCustomer?._id,
            salon: service?.salon?._id,
            service: service?._id,
            shifts: slots,
            paymentMethod: payment_method,
            bookingStatus: "ACCEPTED",
          },
        ]);

        res.status(200).send("Booking has been created successfully")

      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
    
async function bookingbycustomername(req, res) {
  try {
    const { name } = req.query;
    console.log(req.body);

    const booking = await Booking.findOne({ name });

    if (!booking) {
      res.send("Invalid details");
    } else {
      res.send({
        message: "successfully fetched booking",
        data: { booking },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getbooking(req, res) {
  try {
    const { id } = req.query;
    console.log(id);

    const booking = await Booking.find({ _id: id }).populate("salon").populate("services").populate("customer");

    if (!booking) {
      res.send("Invalid details");
    } else {
      res.send({
        message: "successfully fetched bookings",
        data: { booking },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllBookings(req, res) {
    try {
      const booking = await Booking.find();
  
      if (!booking) {
        res.send("Invalid details");
      } else {
        res.send({
          message: "successfully fetched bookings",
          data: { booking },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

async function deletebooking(req, res) {
  try {
    const { name } = req.body;

    const booking = await Booking.deleteOne({ name });
    if (!booking) {
      res.send("Invalid booking name");
    } else {
      res.send({
        messsage: "booking deleted",
        data: booking,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createBooking,
  getbooking,
  bookingbycustomername,
  getAllBookings,
  deletebooking,
};
