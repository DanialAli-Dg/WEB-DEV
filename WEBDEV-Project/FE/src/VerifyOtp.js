import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import { email, required } from "./modules/form/validation";
import RFTextField from "./modules/form/RFTextField";
import FormButton from "./modules/form/FormButton";
import FormFeedback from "./modules/form/FormFeedback";
import withRoot from "./modules/withRoot";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const validate = (values) => {
    const errors = required(["otp"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (data) => {
    console.log(data);
    // setSent(true);
    setLoading(true);
    try {
      console.log(localStorage.getItem("username"), data.otp);
      const response = await axios.post(
        "http://localhost:4000/customer/verify-otp",
        {
          username: localStorage.getItem("username"),
          otp: data.otp,
        }
      );
      console.log(response);
      if (response?.status === 200) {
        setLoading(false);
        localStorage.clear();
        navigate("/sign-in");
        // message.success("Logged in successfully.");
      } else {
        setLoading(false);
        console.log("invalid otp");
        // message.error("Invalid email or password");
      }
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Verify OTP
          </Typography>
          {/* <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link
              href="/premium-themes/onepirate/sign-up/"
              align="center"
              underline="always"
            >
              Sign Up here
            </Link>
          </Typography> */}
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Field
                autoComplete="otp"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="OTP"
                margin="normal"
                name="otp"
                required
                size="large"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="primary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Verify OTP"}
              </FormButton>
            </Box>
          )}
        </Form>
        {/* <Typography align="center">
          <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
          </Link>
        </Typography> */}
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(VerifyOtp);
