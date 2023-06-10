import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

function ServiceFunction() {
  const urlParams = new URLSearchParams(window.location.search);
  const saloonId = urlParams.get('saloonId');
  const [services, setServices] = useState([]);
  console.log("this is ", {saloonId})


  useEffect(() => {
    console.log("get block")
    axios
      .get(`http://localhost:4000/service/getServiceBySalonId/${saloonId}`) 
      .then(response => {
        console.log("res")
        console.log(response.data.data.services);
        setServices(response.data.data.services);
      })
      .catch(error => {
        console.log(error);
      });
  }, [saloonId]); 

  const handleClick = (service) => {
    console.log(`Clicked on service: ${service.name}`);
  };

  return (
    <Grid container spacing={2}>
      {services.map((service) => (
        <Grid item key={service.id} xs={12} sm={6} md={4}>
          <a href="#" onClick={() => handleClick(service)}>
            <Paper
              sx={{ p: 2, cursor: 'pointer' }}
              elevation={3}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#eee')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <img src={service.image} alt={service.name} width="100" height="100" />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {service.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </a>
        </Grid>
      ))}
    </Grid>
  );
}

export default ServiceFunction;