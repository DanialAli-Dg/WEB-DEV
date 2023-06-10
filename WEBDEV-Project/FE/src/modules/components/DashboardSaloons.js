import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 
import axios from 'axios';

function SaloonsDashboard() {

  const [saloons, setSaloons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/salon/getallsalons')
      .then(response => {
        if (response.data && response.data.data && response.data.data.saloons) {
          setSaloons(response.data.data.saloons);
        } else {
          console.log('Invalid API response:', response.data);
        }
      })
      .catch(error => {
        console.log('Error fetching saloons:', error);
      });
  }, []);

  const handleClick = (saloon) => {
    console.log(`Clicked on saloon: ${saloon.name}`);
  };

  if (saloons.length === 0) {
    return <div>Loading saloons...</div>;
  }

  return (
    <Grid container spacing={2}>
      {saloons.map((saloon) => (
        <Grid item key={saloon.id} xs={12} sm={6} md={4}>
          <Link to={`/Service?saloonId=${saloon._id}`}> 
            <Paper sx={{ p: 2, cursor: 'pointer' }} elevation={3} onMouseEnter={(e) => e.target.style.backgroundColor = '#eee'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
              <Grid container spacing={2}>
                <Grid item>
                  <img src={saloon.image} alt={saloon.businessName} width="100" height="100" />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {saloon.businessName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {saloon.email}
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

export default SaloonsDashboard;
