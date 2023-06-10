import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const buttonStyle = {
  backgroundColor: 'lightblue', // Set the background color
  color: 'white', // Set the text color
  padding: '10px', // Set padding
  fontSize: '18px', // Set font size
  borderRadius: "10%"
};

const useStyles = makeStyles((theme) => ({
  formField: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const validationSchema = Yup.object({
  customerName: Yup.string()
    .required('Required'),
  date: Yup.date()
    .required('Required')
    .nullable(),
  slot: Yup.string()
    .required('Required'),
  paymentMethod: Yup.string()
    .required('Required'),
});

const paymentMethods = ["Cash", "Credit"]; 

const BookingForm = (props) => {
  const classes = useStyles();
  const [slots, setSlots] = useState([]); 

  useEffect(() => {
    
    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://localhost:4000/shift/getAllShifts'); 
        setSlots(response.data.data.shift); 
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots(); 
  }, []); 

  const submitForm = async (values) => {
    try {
      const response = await axios.post('http://localhost:4000/booking/createbooking', {
        customerName: values.customerName,
        slots: values.slot,
        payment_method: values.paymentMethod,
        serviceId: props.serviceId,
        salonId: props.salonId,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{ 
        customerName: '', 
        date: '', 
        slot: '', 
        paymentMethod: ''
      }}
      validationSchema={validationSchema}
      onSubmit={submitForm}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form style={{width: '80%' , margin: 'auto',}}>
          <Field style={{paddingBottom: '30px' , margin: 'auto', width: '100%',}}
            as={TextField}
            className={classes.formField}
            name="customerName"
            label="User Name"
            error={touched.customerName && Boolean(errors.customerName)}
            helperText={touched.customerName && errors.customerName}
          />
          <Field style={{marginBottom: '30px' , width: '50%',}}
            as={TextField}
            className={classes.formField}
            name="date"
            type="date"
            label="Date"
            InputLabelProps={{
              shrink: true,
            }}
            error={touched.date && Boolean(errors.date)}
            helperText={touched.date && errors.date}
          />
          <Field style={{marginBottom: '30px' , width: '50%',}}
            as={TextField}
            select
            className={classes.formField}
            name="slot"
            label="Slot"
            value={values.slot}
            onChange={handleChange}
            error={touched.slot && Boolean(errors.slot)}
            helperText={touched.slot && errors.slot}
          >
            {slots.map((option) => (
              <MenuItem key={option._id} value={`${option.start_time} - ${option.end_time}`}>
                {`${option.start_time} - ${option.end_time}`}
              </MenuItem>
            ))}
          </Field>
          <Field
            as={RadioGroup}
            aria-label="paymentMethod"
            name="paymentMethod"
            value={values.paymentMethod}
            onChange={handleChange}
          >
            {paymentMethods.map((method) => (
              <FormControlLabel
                key={method}
                value={method}
                control={<Radio />}
                label={method}
              />
            ))}
          </Field>
          <button style={buttonStyle} type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
export default BookingForm;
