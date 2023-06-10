import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const BookingListPage = () => {
  const bookings = [
    {
      _id: '1',
      customer: 'John Doe',
      salon: { name: 'Salon A', image: 'salon_a_image.jpg', email: 'salonA@example.com' },
      services: [{ name: 'Service A' }],
      date: new Date(),
      bookingStatus: 'PENDING',
    },
    {
      _id: '2',
      customer: 'Jane Smith',
      salon: { name: 'Salon B', image: 'salon_b_image.jpg', email: 'salonB@example.com' },
      services: [{ name: 'Service B' }],
      date: new Date(),
      bookingStatus: 'ACCEPTED',
    },
    {
      _id: '3',
      customer: 'Alice Johnson',
      salon: { name: 'Salon C', image: 'salon_c_image.jpg', email: 'salonC@example.com' },
      services: [{ name: 'Service C' }],
      date: new Date(),
      bookingStatus: 'COMPLETED',
    },
  ];

  const handleClick = (booking) => {
    console.log(`Clicked on booking ID: ${booking._id}`);
  };

  return (
    <Grid container spacing={2}>
      {bookings.map((booking) => (
        <Grid item key={booking._id} xs={12} sm={6} md={4}>
          <a href="http://localhost:3000/Booking" onClick={() => handleClick(booking)}>
            <Paper sx={{ p: 2, cursor: 'pointer' }} elevation={3} onMouseEnter={(e) => e.target.style.backgroundColor = '#eee'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
              <Typography variant="h6" component="div">
                {booking.services[0].name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Salon Name: {booking.salon.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Service Time: 10:00 AM - 11:00 AM {/* Dummy data */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customer Name: {booking.customer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Booking ID: {booking._id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Booking Status: {booking.bookingStatus}
              </Typography>
            </Paper>
          </a>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookingListPage;
