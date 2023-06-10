import React, { useEffect, useState } from 'react';
import { Typography, Paper, Button } from '@mui/material';
import axios from 'axios';
import BookingForm from './modules/form/BookingForm';

const ServiceDetailsPage = () => {
  const [serviceData, setServiceData] = useState(null);
  const [clicked, setClicked] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get('serviceId');

var salonId = "";
console.log(serviceId);
  const fetchServiceDetails = async () => {
    try {
      console.log(serviceId)
      console.log("serviceId")
      
      
      const response = await axios.get(`http://localhost:4000/service/getservicebyserviceID/?_id=${serviceId}`);
      console.log(response)
      setServiceData(response?.data?.data?.oneService);
      salonId = response?.data?.data?.oneService?.salons;
      console.log('Service Data:', response);
      console.log('Service Data:', salonId[0]);
      salonId = salonId[0];
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  if (!serviceData) {   
    return <div>Loading...</div>;
  }
  const handleClick = ()=>{
    setClicked((prev)=>!prev)
  }

  return (
    <>
      <Paper sx={{ p: 2, margin: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          {serviceData.name}
        </Typography>
        <img src={serviceData.image} alt={serviceData.name} style={{ width: 200, height: 200, marginBottom: 16 }} />
        <Typography variant="body1" component="p" gutterBottom>
          Description: {serviceData.description}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Duration: {serviceData.duration} minutes
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Price: ${serviceData.price}
        </Typography>
          <Button onClick={handleClick} variant="contained" color="primary" style={{ marginTop: 16 }}>
            Create Booking
          </Button>
          
      {
        clicked? <BookingForm serviceId={serviceId} salonId={salonId} />: <></>
      }
      </Paper>
      
    
    </>

  );
};

export default ServiceDetailsPage;
