import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ServicesDashboard() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/service/getServices')
      .then(response => {
        console.log(response.data); // Log the response data to verify its structure
        setServices(response.data.data.services);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {services.map((service) => (
        <Grid item key={service._id} xs={12} sm={6} md={4}>
          <Link to={`/ServiceDetails?serviceId=${service._id}`} style={{ textDecoration: 'none' }}>
            <Paper
              sx={{ p: 2, cursor: 'pointer' }}
              elevation={3}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#eee'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
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
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default ServicesDashboard;
