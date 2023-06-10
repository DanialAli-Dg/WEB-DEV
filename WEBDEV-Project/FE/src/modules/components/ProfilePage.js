import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Button, Typography } from '@mui/material';
import { Email, LocationOn, Person } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    marginBottom: theme.spacing(2),
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  detailIcon: {
    marginRight: theme.spacing(1),
  },
}));

function ProfilePage() {
  const classes = useStyles();

  // Dummy data
  const firstName = 'Danial';
  const lastName = 'Naqvi';
  const username = 'snaqvi';
  const email = 'snaqvi@gmail.com';
  const city = 'Karachi';

  return (
    <div className={classes.root}>
      <Avatar sx={{ width: 120, height: 120 }} className={classes.avatar} alt={`${firstName} ${lastName}`} src="https://picsum.photos/200" />
      <Typography variant="h4" gutterBottom>
        {firstName} {lastName}
      </Typography>
      <div className={classes.detailsContainer}>
        <div className={classes.detail}>
          <Person className={classes.detailIcon} />
          <Typography variant="subtitle1">{username}</Typography>
        </div>
        <div className={classes.detail}>
          <Email className={classes.detailIcon} />
          <Typography variant="subtitle1">{email}</Typography>
        </div>
        <div className={classes.detail}>
          <LocationOn className={classes.detailIcon} />
          <Typography variant="subtitle1">{city}</Typography>
        </div>
      </div>
      <Button variant="contained" color="primary" className={classes.button}>
          Edit Profile
        </Button>
    </div>
  );
}

export default ProfilePage;
