const service = require("./model");

async function createservice(req, res) {
  try {
    const { name, description, duration, image, price, start_time, end_time } =
      req.body;
    console.log("body", req.body);

    const serviceExists = await service.findOne({ name });

    if (!serviceExists) {
      const result = await service.create([
        {
          name,
          description,
          duration,
          image,
          price,
          start_time,
          end_time,
        },
      ]);
      console.log("Service created");
      res.status(200).send({ message: "Service created", data: result });
    } else {
      res.status(400).send({message:"invalid data"});
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getservicebyserviceID(req, res) {
  try {
    const { _id } = req.query;

    const oneService = await service.findOne({ _id:_id });

    console.log(oneService)

    if (!oneService) {
      res.send("Invalid details");
    } else {
      res.send({
        message: "successfully fetched service slots",
        data: { oneService },
      });
    }
  } catch (error) {
    console.log(error);
  }
}




async function getServiceBySalonId(req, res) {
  try {
    const _id = req.params.id;
    console.log(req.params);

    const services = await service.find({ salon: _id });

    if (!services || services.length === 0) {
      return res.status(404).send("No services found for this salon id");
    }

    res.send({
      message: "Successfully fetched services",
      data: { services },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}


async function deleteservicebyserviceid(req, res) {
  try {
    const { _id } = req.query;

    const oneservice = await service.deleteOne({ _id });
    if (!oneservice) {
      res.send("Invalid shift id");
    } else {
      res.send({
        messsage: "service deleted",
        data: oneservice,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getAllServices(req, res) {
  try {
    const services = await service.find({});
    if (!services) {
      res.send("Invalid details");
    } else {
      res.send({
        message: "successfully fetched data slots",
        data: { services },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createservice,
  getservicebyserviceID,
  getServiceBySalonId,
  deleteservicebyserviceid,
  getAllServices,
};
