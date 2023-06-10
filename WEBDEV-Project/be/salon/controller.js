const Salon = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
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
    const { business_name, city, country, email, phoneNo, password, address } =
      req.body;
    console.log("body", req.body);

    const salonExists = await Salon.findOne({ email });

    if (!salonExists) {
      const salon = await Salon.create([
        {
          business_name,
          city,
          country,
          email,
          phoneNo,
          password,
          address,
        },
      ]);

      let OTP = generateOTP()
      console.log(OTP)

      let email_sent = await sendCodeByEmail({email, OTP}) ;

      const updateSalonOTP = await Salon.updateOne({email: email},{ otp: OTP });
      console.log("done");

      res.status(200).send({
        message: "Salon signup successfully",
        data: {updateSalonOTP},
      });
    } else {
      res.status(400).send({
        message: "Salon already exists",
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function verifyOTP(req,res){
  try {
    const {username, OTP} = req.body;

    const salon = await Customer.findOne({username})
    // console.log(customer)
    console.log(salon)

    if(salon.otp == OTP){
      const updateSalon = await Salon.updateOne({username: username}, {isOtpVerified: true});
      res.status(200).send({
        message: "Salon Verified",
        data: {updateSalon}
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
    const { email, password } = req.body;
    console.log(req.body);
    let salon;

    if (!email || !password || !isOtpVerified) {
      res.status(401).send({
        message: "Invalid email or password",
      });
    } else {
      salon = await Salon.findOne({ email });
      console.log("email fetched");
      if (!salon || !(await bcrypt.compare(password, salon.password))) {
        res.status(401).send({
          message: "Invalid email or password",
        });
      } else {
        const secretKey = process.env.SECRET_KEY;

        const token = await jwt.sign({ salon }, secretKey, {
          expiresIn: "1hr",
        });
        console.log(token);

        const refToken = await jwt.sign(
          { salon },
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
            message: "salon login successfully",
            data: salon,
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
    const { email, password, newPassword, confirmPassword } = req.body;

    const salon = await Salon.findOne({ email });
    console.log(salon.password);
    console.log(password);

    if (!(await bcrypt.compare(password, salon.password))) {
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

      const updatedSalon = await Salon.updateOne({
        password: hashPassword,
      });

      res.status(200).send({
        message: "Password updated successfully",
        data: updatedSalon,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function forgetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    const salon = await Salon.findOne({ email });
    console.log(salon);

    if (salon) {
      if (newPassword === confirmPassword) {
        const hashPassword = bcrypt.hashSync(newPassword, 10);

        const updateSalonPassword = await Salon.updateOne({
          password: hashPassword,
        });

        res.status(200).send({
          message: "Password updated successfully",
          data: updateSalonPassword,
        });
      } else {
        res.status(400).send({
          message: "Passwords donot match",
        });
      }
    } else {
      res.status(400).send({
        message: "Salon not found or password donot match",
      });
    }
  } catch (error) {
      console.log(error);
  }
}

async function createSalon(req,res) {
  try {
      const{ businessName, city, country, email, password, phoneNo, address, isEmailVerified, isActive, image, services }=req.body;
      console.log("body",req.body);

      const salonExists=await Salon.findOne({businessName})

      if(!salonExists){
          const salon=await Salon.create([
              {
                 businessName, 
                 city, 
                 country, 
                 email, 
                 password, 
                 phoneNo, 
                 address, 
                 isEmailVerified, 
                 isActive, 
                 image, 
                 services
              },
          ]);
          console.log("Salon created")  
          res.send("Salon created")        
      }
      else{
          res.send("invalid data")
      }
  }
  catch (error) {
      console.log(error);
      throw error;
  }
  }   

  async function getAllSaloons(req, res) {
    try {
      const saloons = await Salon.find({});
      if (!saloons) {
        res.send("Invalid details");
      } else {
        res.send({
          message: "successfully fetched salons",
          data: { saloons },
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
module.exports = {
  signup,
  login,
  verifyOTP,
  forgetPassword,
  resetPassword,
  createSalon,
  getAllSaloons,
};
