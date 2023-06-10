const Customer = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 1; i <= 4; i++) {
    OTP += digits[Math.floor((Math.random() * 10)+ 1)];
  }
  return OTP;
}

async function sendCodeByEmail({email, OTP}) {
  sgMail.setApiKey('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');

  const msg = {
    to: email,
    from: 'shehryar.hassan2000@gmail.com',
    subject: 'Your verification code',
    text: `Your verification code is: ${OTP}`,
    html: `<p>Your verification code is: <strong>${OTP}</strong></p>`,
  };

  try {
    console.log(OTP);
    await sgMail.send(msg);
    console.log("Hellooo");
    return `Verification code sent to ${email}`

  } catch (error) {
    console.error(error);
  }
}

async function signup(req, res) {
  try {
    const {
      first_name,
      last_name,
      age,
      city,
      // country,
      email,
      username,
      phoneNo,
      password,
    } = req.body;
    console.log("body", req.body);

    const customerExists = await Customer.findOne({ email, username });

    if (!customerExists) {
      const customer = await Customer.create([
        {
          first_name,
          last_name,
          age,
          city,
          // country,
          email,
          phoneNo,
          username,
          password,
          bookings: [],
        },
      ]);

      let OTP = generateOTP()
      console.log(OTP)

      let email_sent = await sendCodeByEmail({email, OTP}) ;

      const updateCustomerOTP = await Customer.updateOne({username: username},{ otp: OTP });

      res.status(200).send({
        message: "Customer signup successfully",
        data: {updateCustomerOTP},
      });
    } else {
      res.status(400).send({
        message: "customer already exists",
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function verifyOTP(req,res){
  try {
    const {username, otp} = req.body;

    const customer = await Customer.findOne({username})
    // console.log(customer)
    console.log(customer.otp);
    console.log(username, otp);

    if(customer.otp == otp){
      console.log("otp matched")
      const updateCustomer = await Customer.updateOne({username: username}, {isOtpVerified: true});
      res.status(200).send({
        message: "Customer Verified",
        data: {updateCustomer}
      })
    }
    else{
      res.status(400).send({
        message: "invalid otp"
      })
    }
  } catch (error) {
    
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    let customer;

    if (!username || !password) {
      res.status(401).send({
        message: "Invalid username or password",
      });
    } else {
      customer = await Customer.findOne({ username });
      console.log("Customer fetched");
      if (!customer || !(await bcrypt.compare(password, customer.password)) || !customer.isOtpVerified) {
        res.status(401).send({
          message: "Invalid username or password",
        });
      } else {
        const secretKey = process.env.SECRET_KEY;

        const token = await jwt.sign({ customer }, secretKey, {
          expiresIn: "1hr",
        });
        console.log(token);

        const refToken = await jwt.sign(
          { customer },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "8hr",
          }
        );
        console.log(token);

        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .cookie("refreshToken", refToken, {
            httpOnly: true,
          })
          .status(200)
          .send({
            message: "customer login successfully",
            data: customer,
          });
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function resetPassword(req, res) {
  try {
    const { username, password, newPassword, confirmPassword } = req.body;

    const customer = await Customer.findOne({ username });
    console.log(customer.password);
    console.log(password);

    if (!(await bcrypt.compare(password, customer.password))) {
      res.status(401).send({
        message: "incorrect password",
      });
    } else if (newPassword != confirmPassword) {
      res.status(400).send({
        message: "password does not match",
      });
    } else {
      console.log(newPassword);
      const hashPassword = bcrypt.hashSync(newPassword, 10);

      const updatedCustomer = await Customer.updateOne({
        password: hashPassword,
      });

      res.status(200).send({
        message: "Password updated successfully",
        data: updatedCustomer,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function forgetPassword(req, res) {
  try {
    const { username, newPassword, confirmPassword } = req.body;

    const customer = await Customer.findOne({ username });
    console.log(customer);

    if (customer) {
      if (newPassword === confirmPassword) {
        const hashPassword = bcrypt.hashSync(newPassword, 10);

        const updateCustomerPassword = await Customer.updateOne({
          password: hashPassword,
        });

        res.status(200).send({
          message: "Password updated successfully",
          data: updateCustomerPassword,
        });
      } else {
        res.status(400).send({
          message: "Passwords donot match",
        });
      }
    } else {
      res.status(400).send({
        message: "Customer not found or password donot match",
      });
    }
  } catch (error) {}
}

module.exports = {
  signup,
  login,
  verifyOTP,
  forgetPassword,
  resetPassword,
};
