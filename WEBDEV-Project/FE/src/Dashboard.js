import * as React from 'react';
import withRoot from './modules/withRoot';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import SideNav from './modules/components/sidenav';

function Dash() {
    return (
            <div>
            <AppAppBar/>
            <SideNav/>
            <div style={{ width: 'auto', height:'250px' }}>
                <AppFooter />
            </div>
            </div>
        );
}

export default withRoot(Dash);