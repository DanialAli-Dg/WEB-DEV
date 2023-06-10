import * as React from 'react';
import withRoot from './modules/withRoot';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import BookingForm from './modules/form/BookingForm';

function Booking() {
    return (
            <div>
            <AppAppBar/>
            <div style={{paddingTop:'1%'}}>
            <BookingForm/>
            </div>
            <AppFooter />
            </div>
        );
}

export default withRoot(Booking);