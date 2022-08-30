import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Gallery from './Gallery.js';
import Box from '@mui/material/Box';


// ########################################################
// Material UI inline styles
// ########################################################  

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "75%",
        marginTop: "15vh",
        marginBottom: "10vh",
        marginRight: "15vh",
        marginLeft: "15vh",
        borderRadius: '5px',
        backgroundColor: theme.palette.action.disabledBackground,
        paddingTop: "1.5vh",
        paddingBottom: "1.5vh",
    }
}));

// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home() {
    const classes = useStyles();

    return (
        <Box sx={{ flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
            <CssBaseline />
            
            <Container className={classes.container}>
                <Gallery />
            </Container>
        </Box>
    )
}

export default Home