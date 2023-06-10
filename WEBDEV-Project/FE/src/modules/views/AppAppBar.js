import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

// This is the top Bar
// AppBar is a nav container
// Toolbar is a container for the nav items
// Box is a container for the nav items
// Link is a nav item
// sx is a style object
// Routing will be done through react router dom
// Theme we will be using would be black and gold

const itemColor = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            sx={{ fontSize: 24 }}
          >
            {'StyleSeat'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/home"
              sx={itemColor}
            >
              {'Home'}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-in/"
              sx={itemColor}
            >
              {'Appointments'}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-in"
              sx={itemColor}
            >
              {'Sign in'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up"
              sx={{ ...itemColor, color: 'secondary.main' }}
            >
              {'Register'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
