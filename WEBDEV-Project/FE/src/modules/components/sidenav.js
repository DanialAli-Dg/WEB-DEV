import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, Book, Home, Work } from '@mui/icons-material';
import ServicesDashboard from './DashboardServices';
import HomePage from './DashboardSaloons';
import ProfilePage from './ProfilePage';
import BookingsPage from './DashboardBookings';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  activeLink: {
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function SideNav() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const renderPage = () => {
    switch (selectedIndex) {
      case 0:
        return <HomePage />;
      case 1:
        return <ProfilePage />;
      case 2:
        return <ServicesDashboard />;
      case 3:
        return <BookingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button selected={selectedIndex === 0} classes={{ selected: classes.activeLink }} onClick={(event) => handleListItemClick(event, 0)}>
              <ListItemIcon>
                <Home color={selectedIndex === 0 ? 'secondary' : 'action'} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button selected={selectedIndex === 1} classes={{ selected: classes.activeLink }} onClick={(event) => handleListItemClick(event, 1)}>
              <ListItemIcon>
                <AccountCircle color={selectedIndex === 1 ? 'secondary' : 'action'} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button selected={selectedIndex === 2} classes={{ selected: classes.activeLink }} onClick={(event) => handleListItemClick(event, 2)}>
              <ListItemIcon>
                <Book color={selectedIndex === 2 ? 'secondary' : 'action'} />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem button selected={selectedIndex === 3} classes={{ selected: classes.activeLink }} onClick={(event) => handleListItemClick(event, 3)}>
              <ListItemIcon>
                <Work color={selectedIndex === 3 ? 'secondary' : 'action'} />
              </ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {renderPage()}
      </main>
    </div>
  );
}

export default SideNav;
