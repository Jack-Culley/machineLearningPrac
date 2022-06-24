import React from 'react'
import axios from 'axios';
import * as settings from '../settings';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Slider, Button } from '@material-ui/core';

// ########################################################
// Material UI inline styles
// ########################################################
const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "75%",
        marginTop: "15vh",
        marginBottom: "10vh",
        borderRadius: '6px',
        backgroundColor: theme.palette.action.disabledBackground,
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2), paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
    },
    sliders: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    slidertop: {
        marginTop: theme.spacing(4),
    }
}));

// ########################################################
// Our Custom IRIS slider. You may use the default slider instead of this
// ########################################################
const IrisSlider = withStyles({
    root: {
        color: '#751E66',
    },
    valueLabel: {
        left: 'calc(-50% -2)',
        top: -22,
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    mark: {
        height: 8,
        width: 1,
        marginTop: -3,
    },
    markActive: {
        opacity: 1,
        backgroundColor: 'currentColor',
    },
})(Slider);


// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
    // Material UI Classes 
    const classes = useStyles();

    // React hook state variable - Dimensions
    const [image, setImage] = React.useState(null);

    // React hook state variable - Prediction
    const [prediction, setPrediction] = React.useState(null)

    // Function to update the Dimensions state upon slider value change
    const handleFileSelect = event => {
        setImage(event.target.files[0])
    };

    // Function to make the predict API call and update the state variable - Prediction 
    const handlePredict = event => {
        const formData = new FormData();

        formData.append("file", image, image.name);

        console.log(image)

        //Axios variables required to call the predict API
        let headers = { 'Authorization': `Token ${props.token}` };
        let url = settings.API_SERVER + '/api/predict/';
        let method = 'post';
        let config = { headers, method, url, data: formData };

        //Axios predict API call
        axios(config).then(
            res => {setPrediction(res.data["Predicted Image Classifier"])
            }).catch(
                error => {alert(error)})

        return (
            <div>
                <h2>File Details:</h2>
                    <p>File Name: {image.name}</p>             
                    <p>File Type: {image.type}</p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.container}>
                


            <div>
                <input type="file" onChange={this.handleFileSelect} />
                <button onClick={this.handlePredict}>
                  Upload!
                </button>
            </div>

            

            </Container>
        </React.Fragment>
    )
}

export default Home