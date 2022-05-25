import React from 'react';
import TopBar from "./TopBar"
import Footer from "./Footer"
import CssBaseline from '@material-ui/core/CssBaseline';


function Layout({ children }) {
    return (
        <React.Fragment>
            <CssBaseline />
            <TopBar />
            <div>
                {children}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Layout
