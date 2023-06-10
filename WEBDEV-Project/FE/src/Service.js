import * as React from 'react';
import withRoot from './modules/withRoot';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import SalonServicesPage from './modules/components/SaloonService';

function Service(){
  return(
    <div>
    <AppAppBar/>
    <SalonServicesPage/>
    <AppFooter/>
    </div>
  );
}
export default withRoot(Service);