const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customerRouter = require('./customer/routes');
const salonRouter = require('./salon/routes');
const serviceRouter = require('./service/routes');
const shiftRouter = require('./shift/routes');
const bookingRouter = require('./booking/routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');


require('dotenv').config()
// console.log(process.env)

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect('mongodb+srv://shassan22750:VllKbYAbC7La3Rqz@cluster0.9vyc4m5.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser:true})
  .then(() => console.log('Connected!'));

// const client = new twilio(process.env.accountSid, process.env.twilioAuthToken);

app.use("/customer", customerRouter);
app.use("/salon", salonRouter);
app.use("/service", serviceRouter);
app.use("/shift", shiftRouter);
app.use("/booking", bookingRouter);


app.listen(process.env.PORT, ()=> {
    console.log("app is working on ", process.env.PORT)
})
